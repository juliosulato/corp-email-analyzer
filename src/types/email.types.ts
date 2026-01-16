export interface ClassificationResult {
  classification: 'Produtivo' | 'Improdutivo';
  suggestedResponse: string;
  confidence: number;
}