// Preferences.js

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../shared/Card";
import { Checkbox } from "../../../shared/Checkbox";
import { Label } from "../../../shared/Label";

function Preferences({
  preferences,
  selectedPreferences = [],
  onTogglePreference,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rd-primary" />
          Preferências
        </CardTitle>
        <CardDescription>
          Selecione as áreas de interesse para seu negócio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {preferences.map((preference) => (
            <div key={preference} className="flex items-center space-x-2">
              <Checkbox
                id={`pref-${preference}`}
                checked={selectedPreferences.includes(preference)}
                onCheckedChange={() => onTogglePreference(preference)}
              />
              <Label
                htmlFor={`pref-${preference}`}
                className="text-sm leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {preference}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Preferences;
