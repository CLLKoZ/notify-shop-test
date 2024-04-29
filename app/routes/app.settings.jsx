import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Button,
} from "@shopify/polaris";
import { useState } from "react";

export async function loader() {
  // Obtiene los datos de la BD
  let settings = {
    name: "Mi app",
    description: "La descripción de mi aplicación"
  }
  return json(settings);
}

export async function action({ request }) {
  // Actualiza los datos con persistencia

  let settings = await request.formData();
  settings = Object.fromEntries(settings);
  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();

  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      <ui-title-bar title="Settings page" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Ajustes
              </Text>
              <Text as="p" variant="bodyMd">
                Aquí puedes cambiar el nombre y la descripción de tu aplicación
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField label="Nombre de la app" name="name" value={formState.name} onChange={(value) => setFormState({...formState, name: value})}/>
                <TextField label="Descripción" name="description" value={formState.description} onChange={(value) => setFormState({...formState, description: value})}/>
                <Button submit={true}>Guardar </Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
