import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../shared/Card";
import { Checkbox } from "../../../shared/Checkbox";
import { Label } from "../../../shared/Label";

function Features({ features, selectedFeatures = [], onToggleFeature }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rd-primary" />
          Funcionalidades
        </CardTitle>
        <CardDescription>
          Escolha as funcionalidades essenciais para sua operação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`feat-${feature}`}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => onToggleFeature(feature)}
              />
              <Label
                htmlFor={`feat-${feature}`}
                className="text-sm leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Features;
