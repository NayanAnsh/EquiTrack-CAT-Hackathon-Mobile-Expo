import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import {
  ArrowLeft,
  Activity,
  Fuel,
  Clock,
  TrendingUp,
  MapPin,
  Gauge,
  RotateCcw,
  Truck,
  Battery,
} from "lucide-react-native";
import { LineChart, BarChart } from "react-native-chart-kit";

const { width: screenWidth } = Dimensions.get("window");

interface EquipmentKPI {
  date: string;
  machineId: string;
  activeEngineTime: number;
  idleTime: number;
  fuelUsed: number;
  loadPicked: number;
  distanceTraveled: number;
  avgEngineLoad: number;
  numberOfCycles: number;
}

const mockKPIData: EquipmentKPI[] = [
  {
    date: "2025-08-27",
    machineId: "CAT-EXC-01",
    activeEngineTime: 6.5,
    idleTime: 2.0,
    fuelUsed: 145,
    loadPicked: 320,
    distanceTraveled: 4.2,
    avgEngineLoad: 68,
    numberOfCycles: 120,
  },
  {
    date: "2025-08-28",
    machineId: "CAT-EXC-01",
    activeEngineTime: 7.2,
    idleTime: 1.5,
    fuelUsed: 160,
    loadPicked: 355,
    distanceTraveled: 5.0,
    avgEngineLoad: 72,
    numberOfCycles: 140,
  },
  {
    date: "2025-08-29",
    machineId: "CAT-EXC-01",
    activeEngineTime: 5.8,
    idleTime: 3.0,
    fuelUsed: 132,
    loadPicked: 290,
    distanceTraveled: 3.5,
    avgEngineLoad: 64,
    numberOfCycles: 110,
  },
  {
    date: "2025-08-30",
    machineId: "CAT-EXC-01",
    activeEngineTime: 8.0,
    idleTime: 1.2,
    fuelUsed: 178,
    loadPicked: 400,
    distanceTraveled: 6.1,
    avgEngineLoad: 75,
    numberOfCycles: 150,
  },
  {
    date: "2025-08-31",
    machineId: "CAT-EXC-01",
    activeEngineTime: 6.9,
    idleTime: 2.4,
    fuelUsed: 152,
    loadPicked: 330,
    distanceTraveled: 4.7,
    avgEngineLoad: 70,
    numberOfCycles: 125,
  },
];

export default function EquipmentDashboard() {
  const { equipmentId } = useLocalSearchParams<{ equipmentId: string }>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("7d");
  const [selectedMetric, setSelectedMetric] = useState<string>("activeTime");

  const currentData = mockKPIData[mockKPIData.length - 1];
  const totalActiveTime = mockKPIData.reduce((sum, day) => sum + day.activeEngineTime, 0);
  const totalIdleTime = mockKPIData.reduce((sum, day) => sum + day.idleTime, 0);
  const totalFuel = mockKPIData.reduce((sum, day) => sum + day.fuelUsed, 0);
  const totalLoad = mockKPIData.reduce((sum, day) => sum + day.loadPicked, 0);
  const avgEngineLoad = mockKPIData.reduce((sum, day) => sum + day.avgEngineLoad, 0) / mockKPIData.length;

  const getChartData = () => {
    const labels = mockKPIData.map(d => d.date.split('-')[2]);
    
    switch (selectedMetric) {
      case "activeTime":
        return {
          labels,
          datasets: [{
            data: mockKPIData.map(d => d.activeEngineTime),
            color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            strokeWidth: 3,
          }]
        };
      case "fuel":
        return {
          labels,
          datasets: [{
            data: mockKPIData.map(d => d.fuelUsed),
            color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
            strokeWidth: 3,
          }]
        };
      case "load":
        return {
          labels,
          datasets: [{
            data: mockKPIData.map(d => d.loadPicked),
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            strokeWidth: 3,
          }]
        };
      case "efficiency":
        return {
          labels,
          datasets: [{
            data: mockKPIData.map(d => d.avgEngineLoad),
            color: (opacity = 1) => `rgba(168, 85, 247, ${opacity})`,
            strokeWidth: 3,
          }]
        };
      default:
        return {
          labels,
          datasets: [{
            data: mockKPIData.map(d => d.activeEngineTime),
            color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            strokeWidth: 3,
          }]
        };
    }
  };

  const getBarChartData = () => {
    return {
      labels: mockKPIData.map(d => d.date.split('-')[2]),
      datasets: [{
        data: mockKPIData.map(d => d.activeEngineTime + d.idleTime),
      }]
    };
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#ffffff",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#e2e8f0",
      strokeWidth: 1,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>CAT-EXC-01</Text>
          <Text style={styles.subtitle}>Caterpillar 320 Excavator</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>ACTIVE</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Status Cards */}
        <View style={styles.statusCards}>
          <View style={styles.statusCard}>
            <View style={styles.cardHeader}>
              <Activity color="#22c55e" size={20} />
              <Text style={styles.cardTitle}>Active Time</Text>
            </View>
            <Text style={styles.cardValue}>{currentData.activeEngineTime}h</Text>
            <Text style={styles.cardSubtext}>Today</Text>
          </View>
          
          <View style={styles.statusCard}>
            <View style={styles.cardHeader}>
              <Clock color="#f59e0b" size={20} />
              <Text style={styles.cardTitle}>Idle Time</Text>
            </View>
            <Text style={styles.cardValue}>{currentData.idleTime}h</Text>
            <Text style={styles.cardSubtext}>Today</Text>
          </View>
        </View>

        <View style={styles.statusCards}>
          <View style={styles.statusCard}>
            <View style={styles.cardHeader}>
              <Fuel color="#ef4444" size={20} />
              <Text style={styles.cardTitle}>Fuel Used</Text>
            </View>
            <Text style={styles.cardValue}>{currentData.fuelUsed}L</Text>
            <Text style={styles.cardSubtext}>Today</Text>
          </View>
          
          <View style={styles.statusCard}>
            <View style={styles.cardHeader}>
              <Gauge color="#8b5cf6" size={20} />
              <Text style={styles.cardTitle}>Engine Load</Text>
            </View>
            <Text style={styles.cardValue}>{currentData.avgEngineLoad}%</Text>
            <Text style={styles.cardSubtext}>Average</Text>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Truck color="#3b82f6" size={24} />
              <Text style={styles.metricValue}>{currentData.loadPicked}t</Text>
              <Text style={styles.metricLabel}>Load Picked</Text>
            </View>
            
            <View style={styles.metricCard}>
              <MapPin color="#10b981" size={24} />
              <Text style={styles.metricValue}>{currentData.distanceTraveled}km</Text>
              <Text style={styles.metricLabel}>Distance</Text>
            </View>
            
            <View style={styles.metricCard}>
              <RotateCcw color="#f59e0b" size={24} />
              <Text style={styles.metricValue}>{currentData.numberOfCycles}</Text>
              <Text style={styles.metricLabel}>Cycles</Text>
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Performance Trends</Text>
            <View style={styles.periodSelector}>
              {["7d", "30d", "90d"].map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      selectedPeriod === period && styles.periodButtonTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Metric Selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricSelector}>
            {[
              { key: "activeTime", label: "Active Time", color: "#22c55e" },
              { key: "fuel", label: "Fuel Usage", color: "#ef4444" },
              { key: "load", label: "Load Picked", color: "#3b82f6" },
              { key: "efficiency", label: "Engine Load", color: "#8b5cf6" },
            ].map((metric) => (
              <TouchableOpacity
                key={metric.key}
                style={[
                  styles.metricButton,
                  selectedMetric === metric.key && { backgroundColor: `${metric.color}20` },
                ]}
                onPress={() => setSelectedMetric(metric.key)}
              >
                <View style={[styles.metricDot, { backgroundColor: metric.color }]} />
                <Text
                  style={[
                    styles.metricButtonText,
                    selectedMetric === metric.key && { color: metric.color },
                  ]}
                >
                  {metric.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Line Chart */}
          <View style={styles.chartContainer}>
            <LineChart
              data={getChartData()}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        {/* Weekly Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>5-Day Summary</Text>
          
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Active Time</Text>
              <Text style={styles.summaryValue}>{totalActiveTime.toFixed(1)}h</Text>
              <View style={styles.summaryTrend}>
                <TrendingUp color="#22c55e" size={16} />
                <Text style={styles.summaryTrendText}>+12%</Text>
              </View>
            </View>
            
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Fuel</Text>
              <Text style={styles.summaryValue}>{totalFuel}L</Text>
              <View style={styles.summaryTrend}>
                <TrendingUp color="#ef4444" size={16} />
                <Text style={styles.summaryTrendText}>+8%</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Load</Text>
              <Text style={styles.summaryValue}>{totalLoad}t</Text>
              <View style={styles.summaryTrend}>
                <TrendingUp color="#3b82f6" size={16} />
                <Text style={styles.summaryTrendText}>+15%</Text>
              </View>
            </View>
            
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Avg Efficiency</Text>
              <Text style={styles.summaryValue}>{avgEngineLoad.toFixed(0)}%</Text>
              <View style={styles.summaryTrend}>
                <TrendingUp color="#8b5cf6" size={16} />
                <Text style={styles.summaryTrendText}>+5%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Utilization Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Daily Utilization</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={getBarChartData()}
              width={screenWidth - 40}
              height={220}
              yAxisLabel=""
              yAxisSuffix="h"
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              }}
              style={styles.chart}
            />
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#166534",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusCards: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  statusCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 12,
    color: "#94a3b8",
  },
  metricsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
  chartSection: {
    marginTop: 24,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodButtonText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  periodButtonTextActive: {
    color: "#1e293b",
    fontWeight: "600",
  },
  metricSelector: {
    marginBottom: 16,
  },
  metricButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginRight: 12,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metricDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricButtonText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chart: {
    borderRadius: 16,
  },
  summarySection: {
    marginTop: 24,
    marginBottom: 24,
  },
  summaryCards: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  summaryTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  summaryTrendText: {
    fontSize: 12,
    color: "#22c55e",
    fontWeight: "500",
  },
});