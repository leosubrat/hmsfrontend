
export interface AdminPackage {
    packageId?: number;
    packageName: string;
    packagePrice: number;
    description: string;
    testType?: string;
    firstName?:string;
    lastName?:string;
    phoneNumber?:string
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