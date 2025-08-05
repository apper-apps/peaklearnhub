import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TextInfluencerMembership = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const hasAccess = isAuthenticated && ["member", "both"].includes(user?.role);

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
              Text Influencer Membership 콘텐츠를 이용하려면 멤버십 권한이 필요합니다.
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
          <span className="text-gray-600 dark:text-gray-400">Membership</span>
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
              <ApperIcon name="Crown" className="w-10 h-10 text-white" />
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
            <span className="text-2xl md:text-3xl font-medium">Membership</span>
          </motion.h1>
          
<motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            멤버십 전용 고급 콘텐츠와 개인 맞춤형 멘토링을 통해 
            텍스트 인플루언서로서의 역량을 한 단계 더 발전시켜보세요.
          </motion.p>
        </motion.div>
        {/* Membership Benefits */}
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
                  <ApperIcon name="Users" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>1:1 멘토링</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  전문가와의 개별 멘토링 세션을 통해 개인 맞춤형 
                  텍스트 마케팅 전략을 수립하고 실행합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>프리미엄 템플릿</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  검증된 텍스트 템플릿과 카피라이팅 프레임워크를 
                  활용해 효과적인 콘텐츠를 빠르게 제작할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="BarChart3" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>성과 분석 도구</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  텍스트 마케팅 성과를 측정하고 분석할 수 있는 
                  전문 도구와 대시보드를 제공합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="MessageCircle" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>전용 커뮤니티</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  멤버십 회원만의 전용 커뮤니티에서 노하우를 공유하고 
                  네트워킹을 통해 시너지를 창출합니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="Calendar" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>정기 워크샵</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  월 2회 진행되는 전문가 워크샵에서 최신 트렌드와 
                  고급 기법을 학습할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name="Award" className="w-6 h-6 text-white" />
                </div>
                <CardTitle>우선 지원</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  질문 답변, 피드백 제공, 기술 지원 등 모든 서비스에서 
                  우선적인 지원을 받을 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Exclusive Content Preview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              멤버십 전용 콘텐츠
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              일반 과정에서는 공개되지 않는 고급 전략과 실전 노하우를 제공합니다
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
                    <ApperIcon name="Lock" className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    고급 카피라이팅 기법
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 심리학 기반 설득 텍스트 작성법</li>
                    <li>• 바이럴 콘텐츠 제작 공식</li>
                    <li>• 감정 유발 카피라이팅 전략</li>
                    <li>• A/B 테스트 최적화 방법</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="Lock" className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    플랫폼별 전략
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 인스타그램 스토리 마케팅</li>
                    <li>• 네이버 블로그 SEO 최적화</li>
                    <li>• 유튜브 커뮤니티 활용법</li>
                    <li>• 링크드인 B2B 전략</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="Lock" className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    수익화 전략
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 텍스트 기반 상품 판매법</li>
                    <li>• 개인 브랜드 수익 모델</li>
                    <li>• 광고 협찬 계약 가이드</li>
                    <li>• 구독 서비스 런칭 전략</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ApperIcon name="Lock" className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                    실전 케이스 스터디
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 성공한 인플루언서 분석</li>
                    <li>• 실패 사례와 교훈</li>
                    <li>• 월 1억 달성 사례 연구</li>
                    <li>• 브랜드 협업 성공 스토리</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name="Sparkles" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    멤버십 혜택을 지금 바로 시작하세요!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {user?.name}님은 이미 멤버십 권한을 보유하고 계십니다. 
                    프리미엄 콘텐츠와 전용 서비스를 마음껏 이용해보세요.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                      학습 시작하기
                    </Button>
                    <Button variant="outline" size="lg">
                      <ApperIcon name="MessageCircle" className="w-5 h-5 mr-2" />
                      커뮤니티 참여
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

export default TextInfluencerMembership;