{-# LANGUAGE CPP #-}
{-# LANGUAGE NoRebindableSyntax #-}
{-# OPTIONS_GHC -fno-warn-missing-import-lists #-}
{-# OPTIONS_GHC -Wno-missing-safe-haskell-mode #-}
module Paths_2022Assignment2 (
    version,
    getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

#if defined(VERSION_base)

#if MIN_VERSION_base(4,0,0)
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#else
catchIO :: IO a -> (Exception.Exception -> IO a) -> IO a
#endif

#else
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#endif
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []
bindir, libdir, dynlibdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/Users/malcolmpaltiraja/Documents/Uni Files/FIT2102/ass2/a2/.stack-work/install/aarch64-osx/21edf0445c6c193f73f54b0c1d18772023ad61f1e5879c18f1fcb2e3ee13cf2d/9.0.2/bin"
libdir     = "/Users/malcolmpaltiraja/Documents/Uni Files/FIT2102/ass2/a2/.stack-work/install/aarch64-osx/21edf0445c6c193f73f54b0c1d18772023ad61f1e5879c18f1fcb2e3ee13cf2d/9.0.2/lib/aarch64-osx-ghc-9.0.2/2022Assignment2-0.1.0.0-qmFXnbNxMTGXu3knB8Kna-2022Assignment2-exe"
dynlibdir  = "/Users/malcolmpaltiraja/Documents/Uni Files/FIT2102/ass2/a2/.stack-work/install/aarch64-osx/21edf0445c6c193f73f54b0c1d18772023ad61f1e5879c18f1fcb2e3ee13cf2d/9.0.2/lib/aarch64-osx-ghc-9.0.2"
datadir    = "/Users/malcolmpaltiraja/Documents/Uni Files/FIT2102/ass2/a2/.stack-work/install/aarch64-osx/21edf0445c6c193f73f54b0c1d18772023ad61f1e5879c18f1fcb2e3ee13cf2d/9.0.2/share/aarch64-osx-ghc-9.0.2/2022Assignment2-0.1.0.0"
libexecdir = "/Users/malcolmpaltiraja/Documents/Uni Files/FIT2102/ass2/a2/.stack-work/install/aarch64-osx/21edf0445c6c193f73f54b0c1d18772023ad61f1e5879c18f1fcb2e3ee13cf2d/9.0.2/libexec/aarch64-osx-ghc-9.0.2/2022Assignment2-0.1.0.0"
sysconfdir = "/Users/malcolmpaltiraja/Documents/Uni Files/FIT2102/ass2/a2/.stack-work/install/aarch64-osx/21edf0445c6c193f73f54b0c1d18772023ad61f1e5879c18f1fcb2e3ee13cf2d/9.0.2/etc"

getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "2022Assignment2_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "2022Assignment2_libdir") (\_ -> return libdir)
getDynLibDir = catchIO (getEnv "2022Assignment2_dynlibdir") (\_ -> return dynlibdir)
getDataDir = catchIO (getEnv "2022Assignment2_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "2022Assignment2_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "2022Assignment2_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
