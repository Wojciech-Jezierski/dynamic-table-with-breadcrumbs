interface BreadcrumbItem {
  id: number;
  label: string;
}

interface BreadcrumbState {
  breadcrumbItems: BreadcrumbItem[];
  selectedItemId: number | null;
}

export { BreadcrumbState };
