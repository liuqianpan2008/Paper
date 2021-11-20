-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.12 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 paper 的数据库结构
DROP DATABASE IF EXISTS `paper`;
CREATE DATABASE IF NOT EXISTS `paper` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `paper`;

-- 导出  表 paper.sendpaper 结构
DROP TABLE IF EXISTS `sendpaper`;
CREATE TABLE IF NOT EXISTS `sendpaper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seeduser` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '发送卡片的人',
  `recipient` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '0' COMMENT '收到卡片的人',
  `time` datetime DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 正在导出表  paper.sendpaper 的数据：2 rows
DELETE FROM `sendpaper`;
/*!40000 ALTER TABLE `sendpaper` DISABLE KEYS */;
INSERT INTO `sendpaper` (`id`, `title`, `content`, `seeduser`, `recipient`, `time`) VALUES
	(1, '测试标题', '测试内容', 'admin', 'admin', '2021-11-10 16:08:30'),
	(14, '旭旭爱你', '爱你哦', 'admin', '0', '2021-11-20 10:16:56'),
	(13, '测试标题', '测试内容', '小米', 'admin', '2021-11-20 09:26:39'),
	(12, '32424', '524324\n464\n1222', '阿鸡', 'admin', '2021-11-15 17:30:52');
/*!40000 ALTER TABLE `sendpaper` ENABLE KEYS */;

-- 导出  表 paper.user 结构
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sex` char(2) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '男',
  `kay` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '登录凭证',
  UNIQUE KEY `user` (`user`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 正在导出表  paper.user 的数据：3 rows
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user`, `password`, `sex`, `kay`) VALUES
	(1, 'admin', 'admin', '男', '0cf8172e0381ae4d31db9f3c1d1f2b15'),
	(2, 'liuqianpan2008', '13393280310Liu!@#', '女', NULL),
	(3, 'aji', '13393280310Liu!@#', '男', NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
