import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TextInfluencerMaster = () => {
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
              Text Influencer Master 콘텐츠를 이용하려면 마스터 권한이 필요합니다.
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
                <Link to="/program/text-influencer">
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
          <Link to="/program" className="text-primary-600 dark:text-primary-400 hover:underline">
            프로그램
          </Link>
          <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400 mx-2" />
          <Link to="/program/text-influencer" className="text-primary-600 dark:text-primary-400 hover:underline">
            Text Influencer
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
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Text Influencer
            </span>
            <br />
            <span className="text-2xl md:text-3xl font-medium">Master Course</span>
          </motion.h1>
          
<motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            텍스트 인플루언서의 최고 레벨에 도달하기 위한 마스터 과정입니다. 
            전문가 수준의 전략과 고급 기법을 통해 업계 리더로 성장하세요.
          </motion.p>
        </motion.div>
        {/* Master Level Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="Brain" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>전략적 사고</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  텍스트 마케팅의 전략적 관점을 개발하고 
                  시장 트렌드를 분석하여 선제적 대응 능력을 기릅니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>비즈니스 모델링</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  텍스트 기반 비즈니스 모델을 설계하고 
                  수익 구조를 최적화하는 방법을 학습합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="Network" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>네트워크 구축</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  업계 전문가 네트워크를 구축하고 
                  전략적 파트너십을 통해 영향력을 확장합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="Lightbulb" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>혁신 창출</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  새로운 텍스트 마케팅 방법론을 개발하고 
                  업계에 혁신을 가져오는 리더가 됩니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="Users" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>팀 리더십</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  텍스트 마케팅 팀을 이끄는 리더십 스킬과 
                  조직 관리 능력을 개발합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="Globe" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>글로벌 확장</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  국경을 넘나드는 텍스트 인플루언서로 성장하기 위한 
                  글로벌 전략을 수립하고 실행합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Master Curriculum */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              마스터 커리큘럼
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              12주 집중 프로그램으로 텍스트 인플루언서의 최고 수준에 도달합니다
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { week: "1-2주차", title: "마스터 마인드셋", icon: "Target" },
              { week: "3-4주차", title: "고급 전략 수립", icon: "Strategy" },
              { week: "5-6주차", title: "플랫폼 마스터리", icon: "Smartphone" },
              { week: "7-8주차", title: "브랜드 구축", icon: "Award" },
              { week: "9-10주차", title: "수익 최적화", icon: "DollarSign" },
              { week: "11-12주차", title: "레거시 구축", icon: "Crown" }
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-3">
                        <ApperIcon name={item.icon} className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {item.week}
                        </div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Exclusive Resources */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              마스터 전용 리소스
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              최고 수준의 도구와 자료를 활용해 텍스트 인플루언서로서의 역량을 극대화하세요
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
                    <ApperIcon name="Zap" className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    마스터 툴킷
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• AI 기반 콘텐츠 최적화 도구</li>
                    <li>• 심화 분석 대시보드</li>
                    <li>• 자동화 워크플로우 템플릿</li>
                    <li>• ROI 추적 시스템</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="BookOpen" className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    전문가 라이브러리
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 업계 리더 인터뷰 아카이브</li>
                    <li>• 마스터 레벨 케이스 스터디</li>
                    <li>• 최신 연구 보고서</li>
                    <li>• 글로벌 트렌드 분석</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Master Community */}
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
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ApperIcon name="Users" className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    마스터 커뮤니티에 오신 것을 환영합니다!
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    {user?.name}님은 이제 텍스트 인플루언서 마스터 과정의 일원입니다. 
                    최고 수준의 전문가들과 함께 업계를 선도하는 인플루언서로 성장해보세요.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">50+</div>
                      <div className="text-gray-600 dark:text-gray-400">마스터 회원</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">100%</div>
                      <div className="text-gray-600 dark:text-gray-400">성공률</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">24/7</div>
                      <div className="text-gray-600 dark:text-gray-400">전문가 지원</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      <ApperIcon name="Rocket" className="w-5 h-5 mr-2" />
                      마스터 여정 시작
                    </Button>
                    <Button variant="outline" size="lg">
                      <ApperIcon name="MessageCircle" className="w-5 h-5 mr-2" />
                      마스터 커뮤니티 참여
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

export default TextInfluencerMaster;