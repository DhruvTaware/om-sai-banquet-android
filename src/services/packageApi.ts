import type { EventPackage } from "@/data/packages/types";

const API_BASE_URL = "http://localhost:5000";

interface PackagesResponse {
  success: boolean;
  count: number;
  packages: EventPackage[];
}

export async function fetchPackages(): Promise<EventPackage[]> {
  const response = await fetch(`${API_BASE_URL}/api/packages`);

  if (!response.ok) {
    throw new Error(`Failed to fetch packages: ${response.status}`);
  }

  const data: PackagesResponse = await response.json();

  if (!data.success) {
    throw new Error("Failed to load packages from the server.");
  }

  return data.packages;
}

interface PackageResponse {
  success: boolean;
  package: EventPackage;
}

export async function fetchPackageById(id: string): Promise<EventPackage> {
  const response = await fetch(
    `${API_BASE_URL}/api/packages/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch package: ${response.status}`);
  }

  const data: PackageResponse = await response.json();

  if (!data.success || !data.package) {
    throw new Error("Package could not be found.");
  }

  return data.package;
}