import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchPrograms } from "@/store/slices/programSlice";
import Button from "@/components/atoms/Button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import ProgramCard from "@/components/molecules/ProgramCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { programs, loading, error } = useSelector((state) => state.program);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPrograms());
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
  if (error) return <Error message={error} onRetry={() => dispatch(fetchPrograms())} />;

  return (
    <div className="min-h-screen">
{/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/10 dark:via-gray-900 dark:to-secondary-900/10 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                LearnHub Pro
              </span>
              <br />
              <span className="text-2xl md:text-3xl font-medium">
                전문성을 키우는 학습 플랫폼
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
            >
              개인의 역량과 전문성을 체계적으로 발전시킬 수 있는 
              한국형 교육 플랫폼입니다. 각 분야의 전문가들과 함께 
              성장의 여정을 시작하세요.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                onClick={() => navigate("/program")}
                className="w-full sm:w-auto"
              >
                <ApperIcon name="BookOpen" className="w-5 h-5 mr-2" />
                프로그램 둘러보기
              </Button>
              {!isAuthenticated && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto"
                >
                  <ApperIcon name="UserPlus" className="w-5 h-5 mr-2" />
                  무료로 시작하기
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
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
              왜 LearnHub Pro인가요?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              개인 맞춤형 학습 경험과 체계적인 성장 로드맵을 제공합니다
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
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Target" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>맞춤형 학습</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    개인의 수준과 목표에 맞춘 학습 경로를 제공하여 
                    효율적인 성장을 도모합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Users" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>전문가 지도</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    각 분야의 검증된 전문가들이 직접 설계한 
                    커리큘럼으로 실무 역량을 키웁니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Trophy" className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>성과 중심</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    학습 완료 후 실제 업무와 성과로 이어질 수 있는 
                    실용적인 지식을 습득합니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
              인기 프로그램
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              많은 학습자들이 선택한 검증된 프로그램들을 만나보세요
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8"
          >
            {programs.slice(0, 4).map((program) => (
              <motion.div key={program.Id} variants={itemVariants}>
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/program">
              <Button variant="outline" size="lg">
                모든 프로그램 보기
                <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              지금 시작하세요
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
            >
              전문성을 키우고 성장하는 여정을 LearnHub Pro와 함께 시작해보세요. 
              무료 계정으로 다양한 학습 콘텐츠를 체험할 수 있습니다.
            </motion.p>
            <motion.div variants={itemVariants}>
              {!isAuthenticated ? (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => navigate("/signup")}
                  className="bg-white text-primary-600 hover:bg-gray-50 transform hover:scale-105"
                >
                  <ApperIcon name="Rocket" className="w-5 h-5 mr-2" />
                  무료로 시작하기
                </Button>
              ) : (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => navigate("/program")}
                  className="bg-white text-primary-600 hover:bg-gray-50 transform hover:scale-105"
                >
                  <ApperIcon name="BookOpen" className="w-5 h-5 mr-2" />
                  학습 시작하기
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;