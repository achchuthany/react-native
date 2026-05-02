import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {

  const [search, setSearch] = useState("");

  const courses = [
    { name: "Web Development", code: "IT201", credits: 3, fee: 15599, enrolledStudents: 120, image: require("./assets/webdev.jpg") },
    { name: "Database Systems", code: "IT202", credits: 3, fee: 12999, enrolledStudents: 95, image: require("./assets/database.jpg") },
    { name: "Computer Networks", code: "IT203", credits: 3, fee: 13999, enrolledStudents: 85, image: require("./assets/networks.jpg") },
    { name: "Mobile App Development", code: "IT204", credits: 3, fee: 14999, enrolledStudents: 110, image: require("./assets/mobile.webp") },
    { name: "Operating Systems", code: "IT205", credits: 3, fee: 13999, enrolledStudents: 100, image: require("./assets/operating.webp") }
  ];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.heroTextBlock}>
            <Text style={styles.eyebrow}>Academic Programs</Text>
            <Text style={styles.header}>DCS-UoJ Catalog</Text>
            <Text style={styles.subheader}>
              Browse the current intake, compare course details, and find the right fit faster.
            </Text>
          </View>
        </View>

        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Find a course</Text>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Search by course name"
              placeholderTextColor="#6B7280"
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.clearButton} onPress={() => setSearch("")}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{courses.length}</Text>
            <Text style={styles.summaryLabel}>Available courses</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{totalStudents}</Text>
            <Text style={styles.summaryLabel}>Active enrollments</Text>
          </View>
        </View>

        {filteredCourses.map((course, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={course.image}
              style={styles.courseImage}
            />

            <View style={styles.cardHeader}>
              <View style={styles.cardTitleBlock}>
                <Text style={styles.courseTitle}>{course.name}</Text>
                <Text style={styles.courseCode}>{course.code}</Text>
              </View>
              <View style={styles.creditBadge}>
                <Text style={styles.creditBadgeText}>{course.credits} Credits</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Course fee</Text>
                <Text style={styles.infoValue}>Rs. {course.fee}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Enrolled</Text>
                <Text style={styles.infoValue}>{course.enrolledStudents} students</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.enrollButton}>
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
            </TouchableOpacity>

          </View>
        ))}

        {filteredCourses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No matching courses</Text>
            <Text style={styles.emptyStateText}>Try a different keyword to explore the catalog.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F7FB"
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 28,
    gap: 18
  },

  heroSection: {
    flexDirection: "row",
    backgroundColor: "#12324A",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#12324A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 4
  },

  heroTextBlock: {
    flex: 1,
    gap: 6
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#9FD3C7"
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF"
  },

  subheader: {
    fontSize: 14,
    lineHeight: 21,
    color: "#D6E4F0"
  },

  searchSection: {
    gap: 10
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#102A43"
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7E2EA",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#102A43"
  },

  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8EEF5",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14
  },

  clearButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F4B6E"
  },

  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },

  summaryCard: {
    flexGrow: 1,
    flexBasis: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E1E8EF",
    gap: 4
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#102A43"
  },

  summaryLabel: {
    fontSize: 13,
    color: "#5C6B7A"
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E8EF",
    padding: 16,
    borderRadius: 22,
    gap: 14,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2
  },

  courseImage: {
    width: "100%",
    height: 140,
    borderRadius: 16,
    resizeMode: "cover"
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12
  },

  cardTitleBlock: {
    flex: 1,
    gap: 4
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#102A43"
  },

  courseCode: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7C93"
  },

  creditBadge: {
    backgroundColor: "#DFF3EC",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },

  creditBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#156F5C"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },

  infoBlock: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
    gap: 4
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#7B8794"
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#102A43"
  },

  enrollButton: {
    backgroundColor: "#1F4B6E",
    borderRadius: 16,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center"
  },

  enrollButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF"
  },

  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8EF",
    gap: 8
  },

  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#102A43"
  },

  emptyStateText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: "#5C6B7A"
  }

});