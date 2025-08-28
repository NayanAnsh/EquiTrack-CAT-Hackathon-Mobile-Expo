import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Award,
  Clock,
  MapPin,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useOperator } from "@/hooks/useOperator";

export default function ProfileScreen() {
  const { operator, stats } = useOperator();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={["#2563eb", "#1d4ed8"]}
          style={styles.profileHeader}
        >
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <User color="#ffffff" size={32} />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{operator.name}</Text>
              <Text style={styles.profileRole}>{operator.role}</Text>
              <Text style={styles.profileId}>ID: {operator.id}</Text>
            </View>
          </View>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Clock color="#ffffff" size={20} />
              <Text style={styles.statValue}>{stats.totalHours}h</Text>
              <Text style={styles.statLabel}>Total Hours</Text>
            </View>
            <View style={styles.statItem}>
              <Award color="#ffffff" size={20} />
              <Text style={styles.statValue}>{stats.completedRentals}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <MapPin color="#ffffff" size={20} />
              <Text style={styles.statValue}>{stats.sitesWorked}</Text>
              <Text style={styles.statLabel}>Sites</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: "#dbeafe" }]}>
                <User color="#2563eb" size={20} />
              </View>
              <Text style={styles.menuItemText}>Personal Information</Text>
            </View>
            <ChevronRight color="#94a3b8" size={20} />
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: "#fef3c7" }]}>
                <Bell color="#f59e0b" size={20} />
              </View>
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#e2e8f0", true: "#2563eb" }}
              thumbColor="#ffffff"
            />
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: "#dcfce7" }]}>
                <Shield color="#10b981" size={20} />
              </View>
              <Text style={styles.menuItemText}>Security & Privacy</Text>
            </View>
            <ChevronRight color="#94a3b8" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: "#e0e7ff" }]}>
                <HelpCircle color="#6366f1" size={20} />
              </View>
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <ChevronRight color="#94a3b8" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: "#fce7f3" }]}>
                <Award color="#ec4899" size={20} />
              </View>
              <Text style={styles.menuItemText}>Training & Certification</Text>
            </View>
            <ChevronRight color="#94a3b8" size={20} />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: "#fee2e2" }]}>
                <LogOut color="#ef4444" size={20} />
              </View>
              <Text style={[styles.menuItemText, { color: "#ef4444" }]}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>EquipRental Operator v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2024 Equipment Rental System</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  profileHeader: {
    padding: 24,
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  profileRole: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
    marginTop: 4,
  },
  profileId: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8,
    marginTop: 2,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#ffffff",
    opacity: 0.9,
    marginTop: 4,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 4,
  },
});