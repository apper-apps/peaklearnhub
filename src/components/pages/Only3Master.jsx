import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Only3Master = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const hasAccess = isAuthenticated && ["master", "both"].includes(user?.role);

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

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Lock" className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              접근 권한이 필요합니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Only3 Master 콘텐츠를 이용하려면 마스터 권한이 필요합니다.
            </p>
            <div className="space-y-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button className="w-full">로그인</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline" className="w-full">회원가입</Button>
                  </Link>
                </>
              ) : (
                <Link to="/program/only3">
                  <Button className="w-full">프로그램 페이지로 돌아가기</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <Link to="/program" className="text-secondary-600 dark:text-secondary-400 hover:underline">
            프로그램
          </Link>
          <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400 mx-2" />
          <Link to="/program/only3" className="text-secondary-600 dark:text-secondary-400 hover:underline">
            Only3
          </Link>
          <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400 mx-2" />
          <span className="text-gray-600 dark:text-gray-400">Master</span>
        </motion.div>

        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Target" className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            <span className="bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Only3
            </span>
            <br />
            <span className="text-2xl md:text-3xl font-medium">Master Course</span>
          </motion.h1>
          
<motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Only3 방법론의 최고 수준을 마스터하여 어떤 복잡한 상황에서도 
            핵심을 파악하고 최적의 해결책을 도출하는 전문가가 되어보세요.
          </motion.p>
        </motion.div>

        {/* Master Principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Eye" className="w-8 h-8 text-white" />
                </div>
                <CardTitle>직관적 통찰</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  복잡한 정보 속에서 핵심을 즉시 파악하는 
                  직관적 통찰력을 개발합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Zap" className="w-8 h-8 text-white" />
                </div>
                <CardTitle>신속한 실행</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  파악한 핵심을 바탕으로 신속하고 정확한 
                  실행 전략을 수립하고 적용합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="TrendingUp" className="w-8 h-8 text-white" />
                </div>
                <CardTitle>최적화 마스터</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  지속적인 개선을 통해 3가지 핵심 요소의 
                  효과를 극대화하는 방법을 익힙니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Advanced Techniques */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              고급 기법
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Only3 방법론을 다양한 상황과 분야에 적용하는 고급 기법들을 마스터합니다
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="Brain" className="w-5 h-5 text-secondary-600 dark:text-secondary-400 mr-2" />
                    전략적 사고 기법
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 시스템 사고와 Only3 통합</li>
                    <li>• 다차원 분석 프레임워크</li>
                    <li>• 시나리오 기반 핵심 도출</li>
                    <li>• 역발상 사고 활용법</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="Users" className="w-5 h-5 text-secondary-600 dark:text-secondary-400 mr-2" />
                    조직 적용 방법론
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 팀 단위 Only3 실행</li>
                    <li>• 조직 문화 변화 관리</li>
                    <li>• 리더십 관점의 핵심 관리</li>
                    <li>• 성과 측정 및 피드백</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="BarChart3" className="w-5 h-5 text-secondary-600 dark:text-secondary-400 mr-2" />
                    데이터 기반 최적화
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 정량적 핵심 요소 분석</li>
                    <li>• 데이터 시각화 기법</li>
                    <li>• 예측 모델링 활용</li>
                    <li>• A/B 테스트 설계</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="Lightbulb" className="w-5 h-5 text-secondary-600 dark:text-secondary-400 mr-2" />
                    혁신 창출 프로세스
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 창의적 문제 해결</li>
                    <li>• 파괴적 혁신 기법</li>
                    <li>• 아이디어 검증 프로세스</li>
                    <li>• 지속적 개선 체계</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Real-world Applications */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              실전 적용 사례
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              다양한 분야에서 Only3 마스터 기법을 적용한 성공 사례들을 분석합니다
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <ApperIcon name="Building" className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>스타트업 전략</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    제한된 자원으로 최대 효과를 내는 스타트업 전략 수립
                  </p>
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                    성공률 87% 향상
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>마케팅 최적화</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    복잡한 마케팅 전략을 3가지 핵심으로 단순화
                  </p>
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                    ROI 250% 증가
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <ApperIcon name="Users" className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>조직 혁신</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    대기업 조직 구조 개선을 위한 Only3 적용
                  </p>
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                    효율성 65% 개선
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Master Certification */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ApperIcon name="Award" className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Only3 마스터 인증 과정
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    {user?.name}님은 Only3 마스터 과정에 참여할 자격을 갖추셨습니다. 
                    체계적인 학습과 실전 적용을 통해 Only3 전문가로 인증받으세요.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">8주</div>
                      <div className="text-gray-600 dark:text-gray-400">집중 프로그램</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">15+</div>
                      <div className="text-gray-600 dark:text-gray-400">실전 프로젝트</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">100%</div>
                      <div className="text-gray-600 dark:text-gray-400">실무 적용률</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                      마스터 과정 시작
                    </Button>
                    <Button variant="outline" size="lg">
                      <ApperIcon name="Download" className="w-5 h-5 mr-2" />
                      커리큘럼 다운로드
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Only3Master;