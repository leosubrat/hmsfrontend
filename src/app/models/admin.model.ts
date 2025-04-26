
export interface AdminPackage {
    packageId?: number;
    packageName: string;
    packagePrice: number;
    description: string;
    testType?: string;
  }
  interface ApprovePackage {
    id?: number;
    packageId?: number;
    packageName: string;
    packagePrice: number;
    description: string;
    testType: string;
    // Add other properties as needed
  }