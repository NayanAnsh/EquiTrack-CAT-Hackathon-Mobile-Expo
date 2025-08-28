import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { CheckCircle, XCircle, Scan, Flashlight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useOperator } from "@/hooks/useOperator";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const { checkInEquipment, checkOutEquipment } = useOperator();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Scan color="#64748b" size={64} />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to scan QR codes on equipment
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);
    
    try {
      const equipmentData = JSON.parse(data);
      
      if (equipmentData.equipmentId && equipmentData.action) {
        if (equipmentData.action === 'checkin') {
          handleCheckIn(equipmentData);
        } else if (equipmentData.action === 'checkout') {
          handleCheckOut(equipmentData);
        }
      } else {
        Alert.alert("Invalid QR Code", "This QR code is not valid for equipment rental.");
        setTimeout(() => setScanned(false), 2000);
      }
    } catch (error) {
      Alert.alert("Invalid QR Code", "Unable to read equipment information.");
      setTimeout(() => setScanned(false), 2000);
    }
  };

  const handleCheckIn = (equipmentData: any) => {
    Alert.alert(
      "Check In Equipment",
      `Check in ${equipmentData.name || 'equipment'}?`,
      [
        {
          text: "Cancel",
          onPress: () => setTimeout(() => setScanned(false), 1000),
          style: "cancel",
        },
        {
          text: "Check In",
          onPress: () => {
            checkInEquipment(equipmentData.equipmentId);
            Alert.alert("Success", "Equipment checked in successfully!");
            setTimeout(() => setScanned(false), 2000);
          },
        },
      ]
    );
  };

  const handleCheckOut = (equipmentData: any) => {
    Alert.alert(
      "Check Out Equipment",
      `Check out ${equipmentData.name || 'equipment'}?`,
      [
        {
          text: "Cancel",
          onPress: () => setTimeout(() => setScanned(false), 1000),
          style: "cancel",
        },
        {
          text: "Check Out",
          onPress: () => {
            checkOutEquipment(equipmentData.equipmentId);
            Alert.alert("Success", "Equipment checked out successfully!");
            setTimeout(() => setScanned(false), 2000);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Equipment</Text>
        <Text style={styles.subtitle}>Point camera at QR code</Text>
      </View>

      <View style={styles.cameraContainer}>
        {Platform.OS !== 'web' ? (
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          >
            <View style={styles.overlay}>
              <View style={styles.scanArea}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
          </CameraView>
        ) : (
          <View style={styles.webFallback}>
            <Scan color="#64748b" size={64} />
            <Text style={styles.webFallbackText}>
              Camera scanning not available on web
            </Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => setFlashOn(!flashOn)}
        >
          <Flashlight color={flashOn ? "#fbbf24" : "#64748b"} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setScanned(false)}
          disabled={!scanned}
        >
          <Text style={[styles.resetButtonText, { opacity: scanned ? 1 : 0.5 }]}>
            Scan Again
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.instructions}>
        <View style={styles.instructionItem}>
          <CheckCircle color="#10b981" size={20} />
          <Text style={styles.instructionText}>Green light = Check In</Text>
        </View>
        <View style={styles.instructionItem}>
          <XCircle color="#ef4444" size={20} />
          <Text style={styles.instructionText}>Red light = Check Out</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
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
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "#ffffff",
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 20,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  webFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },
  webFallbackText: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 16,
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#ffffff",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
  flashButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#2563eb",
    borderRadius: 12,
  },
  resetButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  instructions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    gap: 12,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  instructionText: {
    fontSize: 14,
    color: "#64748b",
  },
});