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

const GangjeomSeungbu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProgram: program, loading, error } = useSelector((state) => state.program);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProgramBySlug("강점승부"));
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
  if (error) return <Error message={error} onRetry={() => dispatch(fetchProgramBySlug("강점승부"))} />;
  if (!program) return <Error message="프로그램을 찾을 수 없습니다." />;

  const canAccessMaster = isAuthenticated && ["master", "both"].includes(user?.role);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent-50 via-white to-primary-50 dark:from-accent-900/10 dark:via-gray-900 dark:to-primary-900/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <Link to="/program" className="text-accent-600 dark:text-accent-400 hover:underline mr-2">
                  프로그램
                </Link>
                <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">강점승부</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
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
                  variant={canAccessMaster ? "primary" : "outline"}
                  onClick={() => {
                    if (canAccessMaster) {
                      navigate("/program/강점승부/master");
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
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-2xl transform rotate-3"></div>
                <Card className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ApperIcon name="Zap" className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        나만의 강점으로 승부하세요
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        개인의 고유한 강점을 발견하고 이를 경쟁 우위로 
                        전환하는 전략적 방법론을 배워보세요.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Strength Analysis Framework */}
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
              강점 분석 프레임워크
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              체계적인 분석을 통해 숨겨진 강점을 발굴하고 활용 전략을 수립합니다
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Search" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>발견</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    다양한 평가 도구와 분석 방법을 통해 개인의 숨겨진 강점을 체계적으로 발굴합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="BarChart3" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>분석</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    발견된 강점들을 상황별, 맥락별로 분석하여 활용 가능성을 평가합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Target" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>전략화</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    분석된 강점을 바탕으로 개인 맞춤형 경쟁 전략을 수립하고 실행 계획을 세웁니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="TrendingUp" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>실행</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    수립된 전략을 실제 상황에 적용하고 지속적으로 개선해 나갑니다.
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
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg flex items-center justify-center mr-4">
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

      {/* Success Stories */}
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
              성공 사례
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              강점승부 방법론을 통해 실제로 성과를 창출한 사례들을 확인해보세요
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">200%</div>
                    <div className="text-gray-600 dark:text-gray-400">매출 증가</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "개인의 강점을 명확히 파악하고 이를 비즈니스에 활용한 결과, 
                    기존 대비 200% 매출 증가를 달성했습니다."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">85%</div>
                    <div className="text-gray-600 dark:text-gray-400">업무 효율성</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "강점 중심의 업무 배치와 역할 분담을 통해 
                    팀 전체의 업무 효율성이 85% 향상되었습니다."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">3개월</div>
                    <div className="text-gray-600 dark:text-gray-400">승진 기간</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "자신의 강점을 명확히 한 후 전략적으로 활용한 결과, 
                    3개월 만에 팀장으로 승진할 수 있었습니다."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GangjeomSeungbu;