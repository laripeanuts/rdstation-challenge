import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/Card";
import { Label } from "../../../shared/Label";
import { RadioGroup, RadioGroupItem } from "../../../shared/RadioGroup";

function RecommendationType({ selectedRecommendationType = "", onChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rd-primary" />
          Tipo de Recomendação
        </CardTitle>
        <CardDescription>
          Escolha como deseja visualizar as recomendações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedRecommendationType}
          onValueChange={(value) => onChange(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="SingleProduct" id="single" />
            <Label htmlFor="single" className="cursor-pointer">
              Produto Único (melhor match)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MultipleProducts" id="multiple" />
            <Label htmlFor="multiple" className="cursor-pointer">
              Múltiplos Produtos (todos os matches)
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export default RecommendationType;

