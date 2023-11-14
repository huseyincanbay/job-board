export const validateSalary = (salary: any): number | undefined => {
    if (salary !== undefined && typeof salary !== 'number') {
      throw new Error('Salary should be a numeric value');
    }
    return salary;
  };
  
  export const validateLocation = (location: any): string | undefined => {
    if (location !== undefined && typeof location !== 'string') {
      throw new Error('Location should be a string');
    }
    return location;
  };
  
  export const validatePublicationDate = (publicationDate: any): string | undefined => {
    const allowedPublicationDateFilters = [
      'last24Hours',
      'last3Days',
      'last7Days',
      'last15Days',
      'last30Days',
    ];
  
    if (publicationDate !== undefined && !allowedPublicationDateFilters.includes(publicationDate)) {
      throw new Error('Invalid publication date filter');
    }
  
    return publicationDate;
  };
  