import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Operator {
	id: string;
	name: string;
	role: string;
	email: string;
}

export interface Equipment {
	id: string;
	name: string;
	status: "available" | "rented" | "maintenance";
	location: string;
	battery: number;
	operatingHours: number;
	specs: Array<{ label: string; value: string }>;
}

export interface Rental {
	id: string;
	equipmentId: string;
	equipmentName: string;
	status: "active" | "overdue";
	site: string;
	duration: string;
	dueDate: string;
}

export interface Stats {
	hoursToday: number;
	hoursWeek: number;
	activeRentals: number;
	alerts: number;
	totalHours: number;
	completedRentals: number;
	sitesWorked: number;
}

const mockOperator: Operator = {
	id: "OP001",
	name: "Krishnanshu Khanna",
	role: "CAT Senior Equipment Operator",
	email: "krishnanshu.khanna@company.com",
};

const mockEquipment: Equipment[] = [
	{
		id: "EQ001",
		name: "CAT 336 Excavator",
		status: "available",
		location: "Site A - Downtown",
		battery: 85,
		operatingHours: 1247,
		specs: [
			{ label: "Operating Weight", value: "36t" },
			{ label: "Engine", value: "311kW" },
			{ label: "Bucket", value: "1.9m³" },
		],
	},
	{
		id: "EQ002",
		name: "CAT 950 Loader",
		status: "rented",
		location: "Site B - Industrial",
		battery: 92,
		operatingHours: 856,
		specs: [
			{ label: "Operating Weight", value: "19t" },
			{ label: "Engine", value: "168kW" },
			{ label: "Bucket", value: "3.1m³" },
		],
	},
	{
		id: "EQ003",
		name: "CAT 262D3 Skid Steer",
		status: "available",
		location: "Site A - Downtown",
		battery: 78,
		operatingHours: 432,
		specs: [
			{ label: "Operating Weight", value: "4.1t" },
			{ label: "Engine", value: "55kW" },
			{ label: "Rated Operating Capacity", value: "1250kg" },
		],
	},
	{
		id: "EQ004",
		name: "CAT D6 Bulldozer",
		status: "maintenance",
		location: "Maintenance Bay",
		battery: 0,
		operatingHours: 2156,
		specs: [
			{ label: "Operating Weight", value: "22t" },
			{ label: "Engine", value: "161kW" },
			{ label: "Blade", value: "3.7m" },
		],
	},
];

const mockRentals: Rental[] = [
	{
		id: "R001",
		equipmentId: "EQ002",
		equipmentName: "CAT 950 Loader",
		status: "active",
		site: "Site B - Industrial",
		duration: "6h 30m",
		dueDate: "Today 5:00 PM",
	},
	{
		id: "R002",
		equipmentId: "EQ001",
		equipmentName: "CAT 336 Excavator",
		status: "overdue",
		site: "Site C - Residential",
		duration: "8h 15m",
		dueDate: "Yesterday 4:00 PM",
	},
];

const mockStats: Stats = {
	hoursToday: 6.5,
	hoursWeek: 38.2,
	activeRentals: 2,
	alerts: 1,
	totalHours: 1247,
	completedRentals: 156,
	sitesWorked: 12,
};

export function useOperator() {
	const [operator] = useState<Operator>(mockOperator);
	const [equipment] = useState<Equipment[]>(mockEquipment);
	const [currentRentals] = useState<Rental[]>(mockRentals);
	const [stats] = useState<Stats>(mockStats);

	const checkInEquipment = async (equipmentId: string) => {
		console.log(`Checking in equipment: ${equipmentId}`);
	};

	const checkOutEquipment = async (equipmentId: string) => {
		console.log(`Checking out equipment: ${equipmentId}`);
	};

	return {
		operator,
		equipment,
		currentRentals,
		stats,
		checkInEquipment,
		checkOutEquipment,
	};
}
