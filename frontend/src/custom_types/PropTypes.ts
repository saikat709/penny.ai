interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

interface LoadingProps {
    shortened?: boolean;
    className?: string;
    size?: number;
}

type PaginationOptionProps = {
    className?: string;
    hasPrevious?: boolean;
    hasNext?: boolean;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    startPage?: number;
    endPage?: number;
}

type PieChartCompProps = {
    slotData?: { name: string; value: number }[];
    availableSlots: number;
    totalSlots: number;
}


type AnalysisProps = {
    pieData?: { totalSlots: number; availableSlots: number; };
    barData?: { date: string; cars: number }[];
}

type AnalysisDataType = {
    pieData: { totalSlots: number; availableSlots: number; };
    barData: { date: string; cars: number }[];
}


type ProfileFormData = {
  fullName: string;
  homeAddress: string;
  emergencyContact: string;
  medicalInfo: string;
  preferredRoleplay: string;
  customRoleplayName: string;
  customRoleplayDetails: string;
};

type ProfileFormErrors = {
  fullName?: string;
  homeAddress?: string;
  emergencyContact?: string;
  customRoleplayName?: string;
  customRoleplayDetails?: string;
};

export type { 
    ModalProps, LoadingProps,
    PaginationOptionProps, 
    PieChartCompProps, 
    AnalysisProps, AnalysisDataType,
    ProfileFormData, ProfileFormErrors
};