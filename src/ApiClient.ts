export interface CPTCode {
  id: number;
  code: string;
  description: string;
}

export interface CPTCodeCost {
  id: number;
  cptCodeId: number;
  cost: number;
  facilityType: string;
  copay: number;
}

export interface CreateCPTCodeCost {
  cost: number;
  facilityType: string;
  copay: number;
}

class ApiClient {
  private readonly _baseUrl: string;

  public constructor(baseUrl = 'http://localhost:3001/api') {
    this._baseUrl = baseUrl;
  }

  public listCptCodes = async (): Promise<CPTCode[]> => {
    const response = await fetch(`${this._baseUrl}/cptCodes`);
    const json = await response.json();

    return json as CPTCode[];
  };

  public listCptCodeCosts = async (codeId: number): Promise<CPTCodeCost[]> => {
    const response = await fetch(`${this._baseUrl}/cptCodes/${codeId}/costs`);
    const json = await response.json();

    return json as CPTCodeCost[];
  };

  public createCptCodeCost = async (
    codeId: number,
    createCost: CreateCPTCodeCost,
  ): Promise<CPTCodeCost> => {
    const response = await fetch(`${this._baseUrl}/cptCodes/${codeId}/costs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createCost),
    });
    const json = await response.json();

    return json as CPTCodeCost;
  };
}

export const apiClient = new ApiClient();
