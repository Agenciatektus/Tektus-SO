import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Tickets() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tickets</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Abertos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tickets em aberto.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tickets em andamento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fechados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tickets fechados.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Tickets;
export { Tickets }; 