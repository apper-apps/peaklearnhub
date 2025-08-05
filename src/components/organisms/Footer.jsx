import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                LearnHub Pro
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              한국형 교육 플랫폼으로 개인의 성장과 전문성 개발을 지원합니다.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">프로그램</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/program/text-influencer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Text Influencer
                </Link>
              </li>
              <li>
                <Link to="/program/only3" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Only3
                </Link>
              </li>
              <li>
                <Link to="/program/강점승부" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  강점승부
                </Link>
              </li>
              <li>
                <Link to="/program/대운의법칙" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  대운의 법칙
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/money-insight" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Money Insight
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">연락처</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                contact@learnhub.pro
              </div>
              <div className="flex items-center">
                <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                1588-1234
              </div>
              <div className="flex items-center">
                <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                서울특별시 강남구
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 LearnHub Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                개인정보처리방침
              </Link>
              <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;