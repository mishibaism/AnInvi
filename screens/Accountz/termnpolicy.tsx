import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

const TermsAndPolicy = () => {
   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
                <Text style={styles.appName}>AnInvi</Text>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.heading}>{`${index + 1}. ${section.title}`}</Text>
            {Array.isArray(section.content) ? (
              section.content.map((item, i) => (
                <Text key={i} style={styles.listItem}>• {item}</Text>
              ))
            ) : (
              <Text style={styles.paragraph}>{section.content}</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <View style={{ width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ color: '#374151', fontSize: 16, fontWeight: 'bold'}}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const sections = [
  {
    title: "Introduction",
    content:
      "AnInvi is a mobile application developed individually by a student of Pamulang University as part of the Practical Work Program (KKP). This application aims to assist bakery managers in Indonesia in managing their inventory efficiently. By using AnInvi, users are deemed to have read, understood, and agreed to these terms and policies.",
  },
  {
    title: "Definitions",
    content: [
      "Developer: The Universitas Pamulang student who created the AnInvi application.",
      "Partner Institution: The bakery party that has signed the Practical Work Program agreement.",
      "User: The inventory manager or other parties granted access by the developer.",
    ],
  },
  {
    title: "Application Features",
    content: [
      "Stock recording through interactive buttons",
      "QR Code scanning for each rack",
      "Low stock notifications through the application",
      "User action history",
      "Exporting rack data to .xlsx and .pdf (whole or per rack)",
    ],
  },
  {
    title: "Access and Account",
    content:
      "Account creation is done manually by the developer. User data security is a priority, and currently, access is only available to users who have been approved through the KKP contract.",
  },
  {
    title: "Data Collection and Use",
    content: [
      "User name",
      "Log activity",
      "Data is stored locally on the user's device and is not synchronized with third-party servers. This application does not share data with any party outside the scope of KKP.",
    ],
  },
  {
    title: "Ownership and Intellectual Property",
    content:
      "All content, code, and design of the AnInvi application are the intellectual property of the developer and are protected as personal copyrights. Although input from partner institutions can be used for improvement, ownership does not change hands.",
  },
  {
    title: "Responsibility",
    content:
      "The developer is responsible for the development and technical security of the application. However, business decisions made based on data from AnInvi are the sole responsibility of the user.",
  },
  {
    title: "Account Deletion",
    content:
      "Account deletion can only be done by the developer. If in the future, it is agreed that there will be a reconstruction of features, the deletion process can be realized in accordance with the agreement between the developer and the bakery inventory manager.",
  },
  {
    title: "Distribution and Use Limitations",
    content:
      "This application is not intended for public distribution and is only shared with parties registered in the KKP contract. Any form of duplication, modification, or redistribution without written permission from the developer is prohibited.",
  },
  {
    title: "Policy Changes",
    content:
      "The developer has the right to change these policies as the application develops. Any changes will be notified directly to registered users.",
  },
  {
    title: "Applicable Law",
    content:
      "This document follows the legal provisions in the jurisdiction of Indonesia and is subject to the academic ethics of Universitas Pamulang.",
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1f2937",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    minHeight: 100,
  },
  listItem: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
    textAlign: "center",
  },
  version: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
});


export default TermsAndPolicy;
