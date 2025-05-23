import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RecursosDesign() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recursos de Design</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Biblioteca</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Biblioteca de recursos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Templates disponíveis.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de assets.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RecursosDesign;
export { RecursosDesign }; 