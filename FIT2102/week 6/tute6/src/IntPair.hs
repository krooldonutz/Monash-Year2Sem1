-- Surname     | Firstname | Contribution % | Any issues?
-- =====================================================
-- Person 1... |           | 25%            |
-- Person 2... |           | 25%            |
-- Person 3... |           | 25%            |
-- Person 4... |           | 25%            |
--
-- Please do not hesitate to contact your tutors if there are
-- issues that you cannot resolve within the group.
--
-- Complete the worksheet by entering code in the places marked below...
--
-- For full instructions and tests open the file worksheetChecklist.html
-- in Chrome browser. Keep it open side-by-side with your editor window.
-- You will edit this file, save it, build it, and reload the
-- browser window to run the test.


-- | Example representation of a pair of integers.
module IntPair where


-- | An 'IntPair' contains two integers.
data IntPair = IntPair Int Int
  deriving(Show)

-- $setup
-- >>> p1 = (IntPair 5 6)
-- >>> p2 = (IntPair 7 1)
-- >>> p3 = (IntPair 9 9)

-- | Sum the two element of a pair.
--
-- >>> plusIntPair p1
-- 11
--
-- >>> plusIntPair p2
-- 8
plusIntPair :: IntPair -> Int
plusIntPair = undefined

-- | Subtract the two elements of a pair.
--
-- >>> minusIntPair p1
-- -1
--
-- >>> minusIntPair p2
-- 6
minusIntPair :: IntPair -> Int
minusIntPair = undefined

-- | Return the maximum element in a pair.
--
-- >>> maxIntPair p1
-- 6
--
-- >>> maxIntPair p2
-- 7
maxIntPair :: IntPair -> Int
maxIntPair = undefined

-- | Add two pairs together.
--
-- >>> addIntPair p1 p2
-- IntPair 12 7
addIntPair :: IntPair -> IntPair -> IntPair
addIntPair = undefined

-- | Subtract two pairs together.
--
-- >>> subIntPair p1 p2
-- IntPair (-2) 5
subIntPair :: IntPair -> IntPair -> IntPair
subIntPair = undefined
