export const validateSalary = (salary: any): number | undefined => {
    if (salary !== undefined && typeof salary !== 'number') {
      throw new Error('Invalid salary provided!');
    }
    return salary;
  };
  
  export const validateLocation = (location: any): string | undefined => {
    if (location !== undefined && typeof location !== 'string') {
      throw new Error('Invalid Location provided!');
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
      throw new Error('Invalid publication date filter provided!');
    }
  
    return publicationDate;
  };

  export function validateTitle(title: string | undefined): string | undefined {
    if (title && typeof title !== 'string') {
      throw new Error('Invalid title provided!');
    }
    return title;
  };
  
  export function validateCompany(company: string | undefined): string | undefined {
    if (company && typeof company !== 'string') {
      throw new Error('Invalid company provided!');
    }
    return company;
  };

  export function validateDescription(description: string | undefined): string | undefined {
    if (description && typeof description !== 'string') {
      throw new Error('Invalid description provided!');
    }
    return description;
  };

  export function validateRequirements(requirements: string | undefined): string | undefined {
    if (requirements && typeof requirements !== 'string') {
      throw new Error('Invalid requirements provided!');
  }
  return requirements;
  };
  

  
  