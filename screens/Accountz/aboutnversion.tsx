import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

const AboutnversionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const version = "1.2.1";
  const buildNumber = "13";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.appName}>AnInvi</Text>
        <Text style={styles.version}>Version {version} (Build {buildNumber})</Text>

        <Text style={styles.paragraph}>
        AnInvi is a mobile application that has been developed individually by a student from Pamulang University as part of the Practical Work Program (KKP). 
        This application assists bakery managers in Indonesia in efficiently managing their inventory.
        </Text>

        <Text style={styles.sectionTitle}>Main Feature</Text>
        {[
            "Interactive stock recording",
            "QR Code scanning for each shelf(Soon)",
            "Low stock notifications",
            "User action history",
            "Data export to .xlsx"
        ].map((item) => (
          <Text key={item} style={styles.listItem}>
            • {item}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Developer Contact</Text>
        <Text style={styles.paragraph}>Email: mishibaism@gmail.com</Text>
      </ScrollView>
      <View style={styles.footer}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <View style={{ width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ color: '#374151', fontSize: 16, fontWeight: 'bold'}}>Back</Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: 28 }} />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",

  },
  content: {
    padding: 20,
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
  paragraph: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    marginTop: 20,
  },
  listItem: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginLeft: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: 'transparent',
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
});

export default AboutnversionScreen;
