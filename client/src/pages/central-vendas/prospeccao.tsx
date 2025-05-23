function Prospeccao() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Prospecção</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Novos Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de novos leads.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Qualificação</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Processo de qualificação de leads.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Segmentação</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Segmentação de prospects.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Prospeccao;
export { Prospeccao }; 