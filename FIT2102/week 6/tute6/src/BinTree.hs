-- | Implementation of integer valued binary trees.
module BinTree where


-- | A 'BinTree' is a type of tree which is either a 'Leaf' with no values, or
-- a 'Label' with a value and two sub-trees.
data BinTree = Leaf | Label Int BinTree BinTree
  deriving (Show)

-- $setup
-- >>> tree = Label 16 (Label 23 Leaf (Label 73 Leaf Leaf)) (Label 42 Leaf Leaf)
-- >>> one = Label 1 Leaf Leaf

-- | Find the depth of a tree (number of levels)
--
-- >>> depth Leaf
-- 0
--
-- >>> depth (Label 1 Leaf Leaf)
-- 1
--
-- >>> depth tree
-- 3
depth :: BinTree -> Int
depth = undefined

-- | Find the number of nodes in a tree.
--
-- >>> size Leaf
-- 0
--
-- >>> size one
-- 1
--
-- >>> size tree
-- 4
size :: BinTree -> Int
size = undefined

-- | Sum the elements of a numeric tree.
--
-- >>> sumTree Leaf
-- 0
--
-- >>> sumTree one
-- 1
--
-- >>> sumTree tree
-- 154
--
-- prop> sumTree (Label v Leaf Leaf) == v
sumTree :: BinTree -> Int
sumTree = undefined

-- | Find the minimum element in a tree.
--
-- E.g., minTree @(your pattern here)@ = error "Tree is empty"
--
-- >>> minTree one
-- 1
--
-- >>> minTree tree
-- 16
--
minTree :: BinTree -> Int
minTree = undefined

-- | Map a function over a tree.
--
-- >>> mapTree (+1) Leaf
-- Leaf
--
-- >>> mapTree (*1) one
-- Label 1 Leaf Leaf
--
-- >>> mapTree ((flip mod) 2) tree
-- Label 0 (Label 1 Leaf (Label 1 Leaf Leaf)) (Label 0 Leaf Leaf)
mapTree :: (Int -> Int) -> BinTree -> BinTree
mapTree = undefined
