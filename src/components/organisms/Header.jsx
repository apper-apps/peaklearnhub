import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "@/store/slices/authSlice";
import { fetchPrograms } from "@/store/slices/programSlice";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import NavLink from "@/components/molecules/NavLink";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import ProgramCard from "@/components/molecules/ProgramCard";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { programs } = useSelector((state) => state.program);
  
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProgramAccordion, setShowProgramAccordion] = useState(false);
  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const handleProgramHover = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowMegaMenu(true);
  };

  const handleProgramLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 150);
  };

  const handleMegaMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMegaMenuLeave = () => {
    setShowMegaMenu(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("로그아웃되었습니다.");
    navigate("/");
    setShowMobileMenu(false);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
    setShowProgramAccordion(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                LearnHub Pro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink to="/">Home</NavLink>
              
              {/* Program with Mega Menu */}
              <div
                className="relative"
                onMouseEnter={handleProgramHover}
                onMouseLeave={handleProgramLeave}
              >
                <Link
                  to="/program"
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 flex items-center"
                >
                  Program
                  <ApperIcon name="ChevronDown" className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <NavLink to="/money-insight">Money Insight</NavLink>
              <NavLink to="/reviews">Reviews</NavLink>
              {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
            </nav>

            {/* Auth & Theme Controls */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              
              {isAuthenticated ? (
                <div className="hidden lg:flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    안녕하세요, {user?.name}님
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    로그아웃
                  </Button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                    로그인
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => navigate("/signup")}>
                    회원가입
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <ApperIcon name={showMobileMenu ? "X" : "Menu"} className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mega Menu for Desktop */}
        <AnimatePresence>
          {showMegaMenu && (
            <motion.div
              ref={megaMenuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-700/80 shadow-lg hidden lg:block"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 gap-6">
                  {programs.map((program) => (
                    <ProgramCard
                      key={program.Id}
                      program={program}
                      showQuickLinks={true}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">메뉴</h3>
                  <Button variant="ghost" size="sm" onClick={closeMobileMenu}>
                    <ApperIcon name="X" className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="space-y-2">
                  <Link
                    to="/"
                    className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                  
                  {/* Program Accordion */}
                  <div>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setShowProgramAccordion(!showProgramAccordion)}
                    >
                      Program
                      <ApperIcon 
                        name="ChevronDown" 
                        className={`w-4 h-4 transition-transform ${showProgramAccordion ? "rotate-180" : ""}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {showProgramAccordion && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pt-2 space-y-2">
                            <Link
                              to="/program"
                              className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              onClick={closeMobileMenu}
                            >
                              전체 프로그램
                            </Link>
                            {programs.map((program) => (
                              <div key={program.Id} className="space-y-1">
                                <Link
                                  to={`/program/${program.slug}`}
                                  className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                  onClick={closeMobileMenu}
                                >
                                  {program.title}
                                </Link>
                                <div className="pl-4 space-y-1">
                                  {program.hasMembership && (
                                    <Link
                                      to={`/program/${program.slug}/membership`}
                                      className="block px-3 py-1 rounded text-xs text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                      onClick={closeMobileMenu}
                                    >
                                      Membership
                                    </Link>
                                  )}
                                  <Link
                                    to={`/program/${program.slug}/master`}
                                    className="block px-3 py-1 rounded text-xs text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    onClick={closeMobileMenu}
                                  >
                                    Master
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <Link
                    to="/money-insight"
                    className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Money Insight
                  </Link>
                  <Link
                    to="/reviews"
                    className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Reviews
                  </Link>
                  {isAuthenticated && (
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </Link>
                  )}
                </nav>

                {/* Auth Section */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        안녕하세요, {user?.name}님
                      </div>
                      <Button variant="outline" onClick={handleLogout} className="w-full">
                        로그아웃
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        onClick={() => { navigate("/login"); closeMobileMenu(); }}
                        className="w-full"
                      >
                        로그인
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={() => { navigate("/signup"); closeMobileMenu(); }}
                        className="w-full"
                      >
                        회원가입
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;