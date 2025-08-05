import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchPrograms } from "@/store/slices/programSlice";
import ProgramCard from "@/components/molecules/ProgramCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const ProgramLanding = () => {
  const dispatch = useDispatch();
  const { programs, loading, error } = useSelector((state) => state.program);

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
  if (!programs.length) return <Empty title="프로그램이 없습니다" description="아직 등록된 프로그램이 없습니다." />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="BookOpen" className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              프로그램
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            전문가가 설계한 체계적인 학습 프로그램으로 실무 역량을 키우세요. 
            각 프로그램은 단계별 학습과 실전 적용을 통해 확실한 성장을 보장합니다.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {programs.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">프로그램</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
              {programs.reduce((sum, p) => sum + (p.students || 0), 0).toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-400">학습자</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              {(programs.reduce((sum, p) => sum + (p.rating || 0), 0) / programs.length).toFixed(1)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">평균 평점</div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              95%
            </div>
            <div className="text-gray-600 dark:text-gray-400">만족도</div>
          </motion.div>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {programs.map((program) => (
            <motion.div key={program.Id} variants={itemVariants}>
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Award" className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              인증서 발급
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              프로그램 완료 시 공식 인증서를 발급하여 실력을 증명할 수 있습니다.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Users" className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              커뮤니티 지원
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              동료 학습자들과 경험을 공유하고 네트워킹할 수 있는 커뮤니티를 제공합니다.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Headphones" className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              1:1 멘토링
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              필요시 전문가와의 개별 멘토링을 통해 개인 맞춤형 지도를 받을 수 있습니다.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramLanding;