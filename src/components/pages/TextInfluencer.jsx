import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchProgramBySlug } from "@/store/slices/programSlice";
import Button from "@/components/atoms/Button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const TextInfluencer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProgram: program, loading, error } = useSelector((state) => state.program);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProgramBySlug("text-influencer"));
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => dispatch(fetchProgramBySlug("text-influencer"))} />;
  if (!program) return <Error message="프로그램을 찾을 수 없습니다." />;

  const canAccessMembership = isAuthenticated && ["member", "both"].includes(user?.role);
  const canAccessMaster = isAuthenticated && ["master", "both"].includes(user?.role);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/10 dark:via-gray-900 dark:to-secondary-900/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <Link to="/program" className="text-primary-600 dark:text-primary-400 hover:underline mr-2">
                  프로그램
                </Link>
                <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">Text Influencer</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {program.title}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {program.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <ApperIcon name="Clock" className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400">{program.duration}</span>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="BarChart" className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400">{program.level}</span>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Users" className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400">{program.students?.toLocaleString()}명 수강</span>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Star" className="w-5 h-5 text-amber-500 mr-1" />
                  <span className="text-gray-600 dark:text-gray-400">{program.rating} 평점</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {program.hasMembership && (
                  <Button 
                    size="lg"
                    variant={canAccessMembership ? "primary" : "outline"}
                    onClick={() => {
                      if (canAccessMembership) {
                        navigate("/program/text-influencer/membership");
                      } else if (!isAuthenticated) {
                        navigate("/login");
                      } else {
                        alert("멤버십 권한이 필요합니다.");
                      }
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <ApperIcon name="Crown" className="w-5 h-5 mr-2" />
                    Membership {!canAccessMembership && !isAuthenticated && "(로그인 필요)"}
                  </Button>
                )}
                
                <Button 
                  size="lg"
                  variant={canAccessMaster ? "secondary" : "outline"}
                  onClick={() => {
                    if (canAccessMaster) {
                      navigate("/program/text-influencer/master");
                    } else if (!isAuthenticated) {
                      navigate("/login");
                    } else {
                      alert("마스터 권한이 필요합니다.");
                    }
                  }}
                  className="flex-1 sm:flex-none"
                >
                  <ApperIcon name="GraduationCap" className="w-5 h-5 mr-2" />
                  Master {!canAccessMaster && !isAuthenticated && "(로그인 필요)"}
                </Button>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl transform rotate-3"></div>
                <Card className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ApperIcon name="MessageSquare" className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        텍스트로 영향력을 만드세요
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        효과적인 텍스트 커뮤니케이션 전략을 배우고 
                        디지털 시대의 인플루언서가 되어보세요.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              무엇을 배우게 될까요?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              실무에서 바로 적용할 수 있는 핵심 스킬들을 체계적으로 학습합니다
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {program.features?.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                        <ApperIcon name="Check" className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{feature}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name="User" className="w-16 h-16 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {program.instructor}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 mb-4">텍스트 마케팅 전문가</p>
                  <div className="flex justify-center items-center">
                    <ApperIcon name="Star" className="w-5 h-5 text-amber-500 mr-1" />
                    <span className="text-gray-600 dark:text-gray-400">{program.rating} 평점</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                강사 소개
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  10년 이상의 디지털 마케팅 경험을 바탕으로 텍스트 기반 
                  커뮤니케이션 전략을 연구하고 실무에 적용해왔습니다.
                </p>
                <p>
                  다수의 기업과 개인 브랜드의 텍스트 마케팅 성과를 
                  300% 이상 향상시킨 검증된 노하우를 공유합니다.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                      1000+
                    </div>
                    <div className="text-sm">성공 사례</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400 mb-1">
                      50+
                    </div>
                    <div className="text-sm">협력 기업</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TextInfluencer;