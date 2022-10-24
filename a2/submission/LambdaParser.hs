module LambdaParser where

import Parser
import Data.Lambda
import Data.Builder
import Data.Char

-- You can add more imports if you need them

-- Remember that you can (and should) define your own functions, types, and
-- parser combinators. Each of the implementations for the functions below
-- should be fairly short and concise.


{-|
    Part 1
-}

lambdaExpression :: Parser Builder
lambdaExpression = do
    is '('
    is 'λ'
    uno <- satisfy isLetter
    is '.'
    result <- lambdaExpression ||| lettersBracket ||| letters
    is ')'
    return $ lam uno $ result

letters :: Parser Builder
letters = do
    l <- munch1 isLetter
    ret <- pure $ fmap term l
    return $ foldl1 ap ret
    
lettersBracket :: Parser Builder
lettersBracket = do
    l <- munch1 isLetter
    open <- is '('
    inside <-  munch1 isLetter
    close <- is ')'
    l2 <- pure $ fmap term l
    temp <- pure $ foldl1 ap $ fmap term inside
    return $ foldl1 ap l2 `ap` temp

-- | Exercise 1

-- | Parses a string representing a lambda calculus expression in long form
--
-- >>> parse longLambdaP "(λx.xx)"
-- Result >< \x.xx
--
-- >>> parse longLambdaP "(λx.(λy.xy(xx)))"
-- Result >< \xy.xy(xx)
--
-- >>> parse longLambdaP "(λx(λy.x))"
-- UnexpectedChar '('
-- parse longLambdaP "(λx.x)(λy.yy)"

longLambdaP :: Parser Lambda
longLambdaP =  do
    lambda <- lambdaExpression
    return $ build $ lambda

-- | Parses a string representing a lambda calculus expression in short form
--
-- >>> parse shortLambdaP "λx.xx"
-- Result >< \x.xx
--
-- >>> parse shortLambdaP "λxy.xy(xx)"
-- Result >< \xy.xy(xx)
--
-- >>> parse shortLambdaP "λx.x(λy.yy)"
-- Result >< \x.x\y.yy
--
-- >>> parse shortLambdaP "(λx.x)(λy.yy)"
-- Result >< (\x.x)\y.yy
--
-- >>> parse shortLambdaP "λxyz"
-- UnexpectedEof

shortAux :: Parser Builder
shortAux = do
        l <- munch1 isLetter
        ret <- lettersBracket
        l2 <- pure $ fmap term l 
        return $ foldl1 ap l2 `ap` ret


short :: Parser Builder
short = do
    is 'λ' 
    uno <- munch1 isLetter
    is '.'
    result <- shortDos ||| short ||| lettersBracket ||| letters ||| shortAux
    lamVar <- pure $ fmap (lam) (uno) 
    ret <- pure $ foldl1 (.) lamVar $ result
    return ret

shortDos :: Parser Builder
shortDos = do
    string "("
    is 'λ' 
    uno <- munch1 isLetter
    is '.'
    result <- short
    string ")"
    lamVar <- pure $ fmap (lam) (uno) 
    ret <- pure $ foldl1 (.) lamVar $ result
    return ret

shortLambdaP :: Parser Lambda
shortLambdaP = do
    lambda <- shortDos ||| short
    return $ build $ lambda

-- | Parses a string representing a lambda calculus expression in short or long form
-- >>> parse lambdaP "λx.xx"
-- Result >< \x.xx
--
-- >>> parse lambdaP "(λx.xx)"
-- Result >< \x.xx
--
-- >>> parse lambdaP "λx..x"
-- UnexpectedChar '.'
--

lambdaP :: Parser Lambda
lambdaP = shortLambdaP ||| longLambdaP

{-|
    Part 2
-}

-- | Exercise 1

-- IMPORTANT: The church encoding for boolean constructs can be found here -> https://tgdwyer.github.io/lambdacalculus/#church-encodings

-- | Parse a logical expression and returns in lambda calculus
-- >>> lamToBool <$> parse logicP "True and False"
-- Result >< Just False
--
-- >>> lamToBool <$> parse logicP "True and False or not False and True"
-- Result >< Just True
--
-- >>> lamToBool <$> parse logicP "not not not False"
-- Result >< Just True
--
-- >>> parse logicP "True and False"
-- Result >< (\xy.(\btf.btf)xy\_f.f)(\t_.t)\_f.f
--
-- >>> parse logicP "not False"
-- Result >< (\x.(\btf.btf)x(\_f.f)\t_.t)\_f.f
-- >>> lamToBool <$> parse logicP "if True and not False then True or True else False"
-- Result >< Just True

logicP :: Parser Lambda
logicP = undefined

-- | Exercise 2

-- | The church encoding for arithmetic operations are given below (with x and y being church numerals)

-- | x + y = add = λxy.y succ x
-- | x - y = minus = λxy.y pred x
-- | x * y = multiply = λxyf.x(yf)
-- | x ** y = exp = λxy.yx

-- | The helper functions you'll need are:
-- | succ = λnfx.f(nfx)
-- | pred = λnfx.n(λgh.h(gf))(λu.x)(λu.u)
-- | Note since we haven't encoded negative numbers pred 0 == 0, and m - n (where n > m) = 0

-- | Parse simple arithmetic expressions involving + - and natural numbers into lambda calculus
-- >>> lamToInt <$> parse basicArithmeticP "5 + 4"
-- Result >< Just 9
--
-- >>> lamToInt <$> parse basicArithmeticP "5 + 9 - 3 + 2"
-- Result >< Just 13

-- lamToInt <$> parseCalc "5 + 9 - 3 + 2"

succ1:: Builder
succ1 ='n' `lam` 'f' `lam` 'x' `lam` (term 'f' `ap` (term 'n' `ap` term 'f' `ap` term 'x')) 

pred1:: Builder
pred1 = 'n' `lam` 'f' `lam` 'x' `lam` (term 'n' `ap`( 'g' `lam` 'h' `lam` (term 'h') `ap` (term 'g' `ap` term 'f'))`ap` ('u' `lam` (term 'x'))`ap` ('u' `lam` (term 'u')))

add:: (Builder -> Builder -> Builder)
add x y = lam 'x' (lam 'y' (term 'y' `ap` succ1 `ap` (term 'x'))) `ap` x `ap` y

minus:: (Builder -> Builder -> Builder)
minus x y = lam 'x' (lam 'y' (term 'y' `ap` pred1 `ap` (term 'x'))) `ap` x `ap` y

addAux :: Parser (Builder -> Builder -> Builder)
addAux = do
        _ <- spaces
        _ <- is '+'
        pure add

minusAux :: Parser (Builder -> Builder -> Builder)
minusAux = do
        _ <- spaces
        _ <- is '-'
        pure minus 

convInt:: Parser Builder
convInt = do
        _ <- spaces
        int <- munch1 isDigit
        ret <- pure $ read int
        return $ intToLam ret

chain :: Parser a -> Parser (a->a->a) -> Parser a
chain p op = p >>= rest
   where
   rest a = (do
               f <- op
               b <- p
               rest (f a b)
            ) ||| pure a

basicArithmeticP:: Parser Lambda
basicArithmeticP = do
                x <-chain convInt (addAux ||| minusAux)
                return $ build $ x

-- | Parse arithmetic expressions involving + - * ** () and natural numbers into lambda calculus
-- >>> lamToInt <$> parse arithmeticP "5 + 9 * 3 - 2**3"
-- Result >< Just 24
--
-- >>> lamToInt <$> parse arithmeticP "100 - 4 * 2**(4-1)"
-- Result >< Just 68

--lamToInt <$> parse arithmeticP "5**3"


mult :: Builder -> Builder -> Builder
mult x y =  (lam 'x' $ lam 'y' $ lam 'f' $ (term 'x' `ap` (term 'y' `ap` term 'f')) ) `ap` x `ap` y

exponential :: Builder -> Builder -> Builder
exponential x y =  ( lam 'x' $ lam 'y' (term 'y' `ap` term 'x')  ) `ap` x `ap` y

multAux :: Parser (Builder -> Builder -> Builder)
multAux = do
        _ <- spaces
        _ <- is '*'
        pure mult 
expAux :: Parser (Builder -> Builder -> Builder)
expAux = do
        _ <- spaces
        _ <- string "**"
        pure exponential

brackAux :: Parser (Builder -> Builder -> Builder)
brackAux = do
        _ <- is '('
        inside <-  addMinusRet
        _ <- is ')'
        pure exponential

addMinusRet:: Parser Builder
addMinusRet = chain multRet (addAux ||| minusAux )

multRet :: Parser Builder
multRet = chain expRet (multAux)

expRet :: Parser Builder
expRet  = chain brackRet (expAux)

brackRet :: Parser Builder
brackRet = chain convInt (brackAux)

arithmeticP :: Parser Lambda
arithmeticP = do
                x <-addMinusRet
                return $ build $ x


-- | Exercise 3

-- | The church encoding for comparison operations are given below (with x and y being church numerals)

-- | x <= y = LEQ = λmn.isZero (minus m n)
-- | x == y = EQ = λmn.and (LEQ m n) (LEQ n m)

-- | The helper function you'll need is:
-- | isZero = λn.n(λx.False)True

-- >>> lamToBool <$> parse complexCalcP "9 - 2 <= 3 + 6"
-- Result >< Just True
--
-- >>> lamToBool <$> parse complexCalcP "15 - 2 * 2 != 2**3 + 3 or 5 * 3 + 1 < 9"
-- Result >< Just False
complexCalcP :: Parser Lambda
complexCalcP = undefined


{-|
    Part 3
-}

-- | Exercise 1

-- | The church encoding for list constructs are given below
-- | [] = null = λcn.n
-- | isNull = λl.l(λht.False) True
-- | cons = λhtcn.ch(tcn)
-- | head = λl.l(λht.h) False
-- | tail = λlcn.l(λhtg.gh(tc))(λt.n)(λht.t)
--
-- >>> parse listP "[]"
-- Result >< \cn.n
--
-- >>> parse listP "[True]"
-- Result >< (\htcn.ch(tcn))(\xy.x)\cn.n
--
-- >>> parse listP "[0, 0]"
-- Result >< (\htcn.ch(tcn))(\fx.x)((\htcn.ch(tcn))(\fx.x)\cn.n)
--
-- >>> parse listP "[0, 0"
-- UnexpectedEof

true1 :: Builder
true1 = lam 'x' $ lam 'y' (term 'x')

false1 :: Builder
false1 = lam 'x' $ lam 'y' (term 'y')

cons :: Builder
cons = lam 'h' $ lam 't' $ lam 'c' $ lam 'n' (term 'c' `ap` term 'h' `ap` (term 't' `ap` term 'c' `ap` term 'n'))

emptyNullList :: Builder
emptyNullList = lam 'c' $ lam 'n' (term 'n')

isNull :: Builder
isNull = lam 'l' (ap (term 'l') ((lam 'h' $ lam 't' (false1))) `ap` (true1))

head :: Builder
head = lam 'l' (term 'l' `ap` (lam 'h' $ lam 't' (term 'h')) `ap` false1)

tail :: Builder
tail = lam 'l' $ lam 'c' $ lam 'n' (((term 'l' `ap` ((lam 'h' $ lam 't' $ lam 'g' ((term 'g' `ap` term 'h') `ap` (term 't' `ap` term 'c'))))) `ap` (lam 't' (term 'n')) `ap` (lam 'h' $ lam 't' (term 't'))))

listP :: Parser Lambda
listP = do
    res <- listPAux
    pure $ build $ res

listPAux :: Parser Builder
listPAux = do
    _ <- is '['
    element <- empty ||| getElement ||| lastElement
    return $ foldl1 ap element

empty:: Parser [Builder]
empty = do
    _ <- is ']'
    return $ [emptyNullList]

listOfNum :: Parser [Builder]
listOfNum = do
    _ <- spaces
    a <- munch1 isDigit
    let b = intToLam $ read a
    return $ [b]

getElement:: Parser [Builder]
getElement = do
    a <- booleanCheck ||| lastElement ||| listOfNum
    _ <- traverse is ", "
    nextItem <- getElement ||| lastElement
    return $ ([cons] ++ a ++ nextItem)

lastElement:: Parser [Builder]
lastElement = do
    a <- booleanCheck ||| listOfNum
    _ <- is ']'
    return $ [cons] ++ (fmap (`ap` emptyNullList) a) 

booleanCheck:: Parser [Builder]
booleanCheck = trueList ||| falseList

trueList:: Parser [Builder]
trueList = do
    _ <- traverse is "True"
    return $ [true1]

falseList:: Parser [Builder]
falseList = do
    _ <- traverse is "false"
    return $ [false1]


-- >>> lamToBool <$> parse listOpP "head [True, False, True, False, False]"
-- Result >< Just True
--
-- >>> lamToBool <$> parse listOpP "head rest [True, False, True, False, False]"
-- Result >< Just False
--
-- >>> lamToBool <$> parse listOpP "isNull []"
-- Result >< Just True
--
-- >>> lamToBool <$> parse listOpP "isNull [1, 2, 3]"
-- Result >< Just False
listOpP :: Parser Lambda
listOpP = undefined


-- | Exercise 2

-- | Implement your function(s) of choice below!
