import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboards() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboards</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Executivo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dashboard executivo e estratégico.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Operacional</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dashboard operacional e tático.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Personalizado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dashboards personalizados.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 