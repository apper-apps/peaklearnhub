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

const DaeuneuiBeobchik = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProgram: program, loading, error } = useSelector((state) => state.program);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProgramBySlug("대운의법칙"));
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
  if (error) return <Error message={error} onRetry={() => dispatch(fetchProgramBySlug("대운의법칙"))} />;
  if (!program) return <Error message="프로그램을 찾을 수 없습니다." />;

  const canAccessMaster = isAuthenticated && ["master", "both"].includes(user?.role);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-purple-900/10 dark:via-gray-900 dark:to-indigo-900/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <Link to="/program" className="text-purple-600 dark:text-purple-400 hover:underline mr-2">
                  프로그램
                </Link>
                <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">대운의 법칙</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
                      navigate("/program/대운의법칙/master");
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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl transform rotate-3"></div>
                <Card className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ApperIcon name="Compass" className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        인생과 사업의 타이밍을 읽으세요
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        대운의 흐름을 이해하고 최적의 타이밍에 
                        중요한 결정을 내리는 지혜를 배워보세요.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fortune Principles */}
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
              대운의 5가지 법칙
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              천년의 지혜가 담긴 대운의 법칙을 현대적으로 해석한 실용적 원리들
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Clock" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-center">시기 인식의 법칙</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    모든 일에는 최적의 타이밍이 있으며, 이를 정확히 파악하는 것이 성공의 첫걸음입니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="TrendingUp" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-center">흐름 활용의 법칙</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    시대와 환경의 흐름을 읽고 이에 순응하여 최대의 효과를 창출합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Balance" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-center">균형 유지의 법칙</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    극단을 피하고 중용의 미덕을 실천하여 지속 가능한 성공을 추구합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Eye" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-center">직관 개발의 법칙</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    논리적 분석을 넘어선 직관적 통찰력을 개발하여 기회를 포착합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Target" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-center">집중 실행의 법칙</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    적절한 타이밍에 모든 역량을 집중하여 결정적인 성과를 달성합니다.
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
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
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

      {/* Life Phases */}
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
              인생의 대운 주기
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              인생의 각 단계별 특성을 이해하고 적절한 전략을 수립하세요
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">🌱</div>
                  <CardTitle>성장기 (20-30대)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    기초를 다지고 역량을 축적하는 시기
                  </p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                    <li>• 학습과 경험 축적</li>
                    <li>• 인맥 구축</li>
                    <li>• 전문성 개발</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">🚀</div>
                  <CardTitle>발전기 (30-50대)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    축적된 역량을 활용하여 성과를 창출하는 시기
                  </p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                    <li>• 적극적 도전</li>
                    <li>• 리더십 발휘</li>
                    <li>• 사업 확장</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">👑</div>
                  <CardTitle>완성기 (50대 이후)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    지혜와 경험을 바탕으로 가치를 창출하는 시기
                  </p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                    <li>• 지혜 전수</li>
                    <li>• 가치 창출</li>
                    <li>• 레거시 구축</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DaeuneuiBeobchik;