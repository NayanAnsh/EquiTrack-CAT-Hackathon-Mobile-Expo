import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Clock,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Settings,
  QrCode,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useOperator } from "@/hooks/useOperator";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const { operator, currentRentals, stats } = useOperator();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.operatorName}>{operator.name}</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings color="#64748b" size={24} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <LinearGradient
              colors={["#3b82f6", "#2563eb"]}
              style={[styles.statCard, { flex: 1, marginRight: 8 }]}
            >
              <Clock color="#ffffff" size={24} />
              <Text style={styles.statValue}>{stats.hoursToday}h</Text>
              <Text style={styles.statLabel}>Today</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={[styles.statCard, { flex: 1, marginLeft: 8 }]}
            >
              <TrendingUp color="#ffffff" size={24} />
              <Text style={styles.statValue}>{stats.hoursWeek}h</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </LinearGradient>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCardWhite, { flex: 1, marginRight: 8 }]}>
              <MapPin color="#2563eb" size={20} />
              <Text style={styles.statValueDark}>{stats.activeRentals}</Text>
              <Text style={styles.statLabelDark}>Active Rentals</Text>
            </View>
            
            <View style={[styles.statCardWhite, { flex: 1, marginLeft: 8 }]}>
              <AlertTriangle color="#f59e0b" size={20} />
              <Text style={styles.statValueDark}>{stats.alerts}</Text>
              <Text style={styles.statLabelDark}>Alerts</Text>
            </View>
          </View>
        </View>

        {/* Current Rentals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Rentals</Text>
          {currentRentals.map((rental) => (
            <View key={rental.id} style={styles.rentalCard}>
              <View style={styles.rentalHeader}>
                <View>
                  <Text style={styles.equipmentName}>{rental.equipmentName}</Text>
                  <Text style={styles.equipmentId}>ID: {rental.equipmentId}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: rental.status === 'active' ? '#dcfce7' : '#fef3c7' }]}>
                  <Text style={[styles.statusText, { color: rental.status === 'active' ? '#166534' : '#92400e' }]}>
                    {rental.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              
              <View style={styles.rentalDetails}>
                <View style={styles.rentalDetail}>
                  <MapPin color="#64748b" size={16} />
                  <Text style={styles.rentalDetailText}>{rental.site}</Text>
                </View>
                <View style={styles.rentalDetail}>
                  <Clock color="#64748b" size={16} />
                  <Text style={styles.rentalDetailText}>{rental.duration}</Text>
                </View>
                <View style={styles.rentalDetail}>
                  <Calendar color="#64748b" size={16} />
                  <Text style={styles.rentalDetailText}>Due: {rental.dueDate}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <QrCode color="#2563eb" size={24} />
              </View>
              <Text style={styles.quickActionText}>Scan Equipment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <MapPin color="#2563eb" size={24} />
              </View>
              <Text style={styles.quickActionText}>Check Location</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <AlertTriangle color="#2563eb" size={24} />
              </View>
              <Text style={styles.quickActionText}>Report Issue</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#64748b",
  },
  operatorName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 4,
  },
  settingsButton: {
    padding: 8,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  statCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  statCardWhite: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 8,
  },
  statValueDark: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#ffffff",
    opacity: 0.9,
    marginTop: 4,
  },
  statLabelDark: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  rentalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  rentalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  equipmentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  equipmentId: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  rentalDetails: {
    gap: 8,
  },
  rentalDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rentalDetailText: {
    fontSize: 14,
    color: "#64748b",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAction: {
    alignItems: "center",
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "500",
  },
});