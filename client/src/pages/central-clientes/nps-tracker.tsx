import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function NPSTracker() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">NPS Tracker</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>NPS Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Pontuação atual de NPS.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detratores</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Clientes detratores identificados.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Promotores</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Clientes promotores identificados.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NPSTracker;
export { NPSTracker }; 