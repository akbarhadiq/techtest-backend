-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: database_tech_test
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('2603470f-8292-4669-8e46-596701958083','91bc424fb168e90afd2d04a0b88687c6a7cc1e2d564f974428510f968a2cd738','2024-04-03 01:56:46.567','20240403015646_init',NULL,NULL,'2024-04-03 01:56:46.538',1),('5e4fddc5-a1ef-4b1b-a2d0-75bff718df17','0e7e7e0ef8af967dfb5d1c2308c5e4d8d2454a74b89f0a574a093dbcaaab1bed','2024-04-03 02:58:50.036','20240403025850_init',NULL,NULL,'2024-04-03 02:58:50.018',1),('6b92c3d4-494a-4c4f-9e21-79a64f0e469b','96138265b035e918b425fc60890aba28239f49bb48f21c570d768cdb9ba442e9','2024-04-03 03:01:56.131','20240403030156_init',NULL,NULL,'2024-04-03 03:01:56.113',1),('7655f3f5-240a-48f4-af1f-3f4ac998a175','0ea58afe413d175ba96ba89e9aa42fa24b37ae913cded64acdaf521c558ffbb1','2024-04-03 01:50:35.610','20240403015035_init',NULL,NULL,'2024-04-03 01:50:35.457',1),('83d46bcf-87d4-4b57-9917-63cf17384f83','7ddde794f309559cf853886ab35c90c70a74c5646d9a650d169f92c2de074883','2024-04-04 07:46:06.976','20240404074606_init',NULL,NULL,'2024-04-04 07:46:06.855',1),('c7ecb5b0-34c0-4b70-8ae4-12e69a79ed17','65a0160883548fb049a2140d65068a080eca54d0e95ead083f96f8bd998a2808','2024-04-04 04:22:27.907','20240404042227_init',NULL,NULL,'2024-04-04 04:22:27.853',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Harry Potter','JK-45',1),(3,'A Study in Scarlet','SHR-1',5),(4,'Twilight','Putri',1),(5,'The Hobbit, or There and Back Again','HOB-83',4),(6,'The Lion, the Witch and the Wardrobe','NRN-7',1),(7,'Chainsaw Man Vol. 1','CSM-1',1);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowedbook`
--

DROP TABLE IF EXISTS `borrowedbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowedbook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrow_date` datetime(3) NOT NULL,
  `return_date` datetime(3) DEFAULT NULL,
  `penalty_applied` tinyint(1) NOT NULL DEFAULT '0',
  `member_id` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BorrowedBook_member_id_fkey` (`member_id`),
  KEY `BorrowedBook_book_id_fkey` (`book_id`),
  CONSTRAINT `BorrowedBook_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BorrowedBook_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowedbook`
--

LOCK TABLES `borrowedbook` WRITE;
/*!40000 ALTER TABLE `borrowedbook` DISABLE KEYS */;
/*!40000 ALTER TABLE `borrowedbook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penalty_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'M-0','ucup',0),(2,'M-1','uben',0),(3,'M-2','Angga',0),(4,'M-3','Ferry',0),(5,'M-4','Putri',0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userborrowhistory`
--

DROP TABLE IF EXISTS `userborrowhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userborrowhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrow_date` datetime(3) NOT NULL,
  `return_date` datetime(3) DEFAULT NULL,
  `penalty_applied` tinyint(1) NOT NULL,
  `member_id` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userBorrowHistory_member_id_fkey` (`member_id`),
  KEY `userBorrowHistory_book_id_fkey` (`book_id`),
  CONSTRAINT `userBorrowHistory_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `userBorrowHistory_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userborrowhistory`
--

LOCK TABLES `userborrowhistory` WRITE;
/*!40000 ALTER TABLE `userborrowhistory` DISABLE KEYS */;
INSERT INTO `userborrowhistory` VALUES (1,'2024-04-04 07:58:54.720','2024-04-04 07:59:01.374',0,2,5);
/*!40000 ALTER TABLE `userborrowhistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-05 15:58:06
