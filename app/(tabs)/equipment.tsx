import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Battery,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react-native";
import { useOperator } from "@/hooks/useOperator";
import { router } from "expo-router";

export default function EquipmentScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { equipment } = useOperator();

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && item.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "#10b981";
      case "rented":
        return "#f59e0b";
      case "maintenance":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle color="#10b981" size={16} />;
      case "rented":
        return <Clock color="#f59e0b" size={16} />;
      case "maintenance":
        return <AlertCircle color="#ef4444" size={16} />;
      default:
        return <AlertCircle color="#64748b" size={16} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Equipment</Text>
        <Text style={styles.subtitle}>Available equipment in your area</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search color="#64748b" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search equipment..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#64748b" size={20} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
        {["all", "available", "rented", "maintenance"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.filterTabActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === filter && styles.filterTabTextActive,
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Equipment List */}
      <ScrollView style={styles.equipmentList} showsVerticalScrollIndicator={false}>
        {filteredEquipment.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.equipmentCard}
            onPress={() => {
              if (item.status === "rented") {
                router.push(`/equipment/${item.id}`);
              }
            }}
          >
            <View style={styles.equipmentHeader}>
              <View style={styles.equipmentInfo}>
                <Text style={styles.equipmentName}>{item.name}</Text>
                <Text style={styles.equipmentId}>ID: {item.id}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
                {getStatusIcon(item.status)}
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.equipmentDetails}>
              <View style={styles.detailRow}>
                <MapPin color="#64748b" size={16} />
                <Text style={styles.detailText}>{item.location}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Battery color="#64748b" size={16} />
                <Text style={styles.detailText}>Battery: {item.battery}%</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Clock color="#64748b" size={16} />
                <Text style={styles.detailText}>Hours: {item.operatingHours}</Text>
              </View>
            </View>

            <View style={styles.equipmentSpecs}>
              <Text style={styles.specsTitle}>Specifications</Text>
              <View style={styles.specsGrid}>
                {item.specs.map((spec, index) => (
                  <View key={index} style={styles.specItem}>
                    <Text style={styles.specLabel}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {item.status === "available" && (
              <TouchableOpacity style={styles.rentButton}>
                <Text style={styles.rentButtonText}>Request Rental</Text>
              </TouchableOpacity>
            )}
            
            {item.status === "rented" && (
              <View style={styles.dashboardHint}>
                <Text style={styles.dashboardHintText}>Tap to view dashboard</Text>
                <ChevronRight color="#2563eb" size={16} />
              </View>
            )}
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 20,
    paddingVertical: 16,},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
  },
  filterButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterTabs: {
    height: 40, 
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginBottom: 0,
    backgroundColor: "#fff",
    zIndex: 0,
  },
  filterTab: {
    paddingHorizontal: 16,
    height: 40,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: "#2563eb",
  },
  filterTabText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  filterTabTextActive: {
    color: "#ffffff",
  },
  equipmentList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  equipmentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  equipmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  equipmentId: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  equipmentDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#64748b",
  },
  equipmentSpecs: {
    marginBottom: 16,
  },
  specsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  specsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  specItem: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  specLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 2,
  },
  specValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  rentButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  rentButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  dashboardHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    gap: 8,
  },
  dashboardHintText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "500",
  },
});