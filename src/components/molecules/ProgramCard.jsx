import React from "react";
import { Link } from "react-router-dom";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ProgramCard = ({ program, showQuickLinks = false }) => {
  return (
    <Card className="h-full flex flex-col group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {program.title}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {program.description}
            </p>
          </div>
          <div className="ml-4 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
            <ApperIcon name="BookOpen" className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">카테고리</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{program.category}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">기간</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{program.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">레벨</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{program.level}</span>
          </div>
          {program.rating && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">평점</span>
              <div className="flex items-center">
                <ApperIcon name="Star" className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                <span className="font-medium text-gray-900 dark:text-gray-100">{program.rating}</span>
              </div>
            </div>
          )}
        </div>

        {showQuickLinks ? (
          <div className="space-y-2">
            {program.hasMembership && (
              <Link to={`/program/${program.slug}/membership`}>
                <Button variant="outline" size="sm" className="w-full">
                  <ApperIcon name="Crown" className="w-4 h-4 mr-2" />
                  Membership
                </Button>
              </Link>
            )}
            <Link to={`/program/${program.slug}/master`}>
              <Button variant="primary" size="sm" className="w-full">
                <ApperIcon name="GraduationCap" className="w-4 h-4 mr-2" />
                Master
              </Button>
            </Link>
          </div>
        ) : (
          <Link to={`/program/${program.slug}`}>
            <Button variant="primary" className="w-full">
              자세히 보기
              <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgramCard;