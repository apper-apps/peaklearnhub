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

const Only3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProgram: program, loading, error } = useSelector((state) => state.program);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProgramBySlug("only3"));
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
  if (error) return <Error message={error} onRetry={() => dispatch(fetchProgramBySlug("only3"))} />;
  if (!program) return <Error message="프로그램을 찾을 수 없습니다." />;

  const canAccessMaster = isAuthenticated && ["master", "both"].includes(user?.role);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-50 via-white to-accent-50 dark:from-secondary-900/10 dark:via-gray-900 dark:to-accent-900/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <Link to="/program" className="text-secondary-600 dark:text-secondary-400 hover:underline mr-2">
                  프로그램
                </Link>
                <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">Only3</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                <span className="bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
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
                <Button 
                  size="lg"
                  variant={canAccessMaster ? "secondary" : "outline"}
                  onClick={() => {
                    if (canAccessMaster) {
                      navigate("/program/only3/master");
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
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 to-accent-500/20 rounded-2xl transform rotate-3"></div>
                <Card className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ApperIcon name="Target" className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        핵심 3요소에 집중하세요
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        복잡한 것을 단순하게, 중요한 것에만 집중하는 
                        효율적인 학습과 성과 창출 방법론을 배워보세요.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Only3 Methodology */}
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
              Only3 방법론
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              모든 복잡한 문제를 3가지 핵심 요소로 정리하는 혁신적인 접근법
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <CardTitle>핵심 파악</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    복잡한 정보와 상황에서 가장 중요한 3가지 핵심 요소를 
                    빠르게 식별하는 방법을 학습합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <CardTitle>우선순위 설정</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    3가지 핵심 요소의 중요도와 긴급도를 평가하여 
                    효과적인 우선순위를 설정하는 기법을 익힙니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <CardTitle>실행 최적화</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    선정된 3가지 핵심 요소에 집중하여 최대의 성과를 
                    창출하는 실행 전략을 수립하고 적용합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
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
              학습 내용
            </motion.h2>
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
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center mr-4">
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

      {/* Benefits Section */}
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
              Only3로 얻는 효과
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">80%</div>
              <div className="text-gray-600 dark:text-gray-400">시간 절약</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">300%</div>
              <div className="text-gray-600 dark:text-gray-400">생산성 향상</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">목표 달성률</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">만족도</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Only3;