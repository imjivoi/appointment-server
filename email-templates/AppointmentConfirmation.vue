<script setup lang="ts">
import { format } from "date-fns/esm";

const props = defineProps<{
  email: string;
  fullName: string | undefined;
  businessName: string;
  serviceName: string;
  address: string;
  date: Date | string;
  cancelUrl: string;
}>();

const formattedDate = format(new Date(props.date), "MMMM dd yyyy");
const formattedTime = format(new Date(props.date), "hh:mm");

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: "16px",
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  padding: "12px 30px",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px 40px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Confirmacion de tu cita</EPreview>
    <EBody :style="main">
      <EContainer>
        <ESection :style="logo">
          <!-- <EImg src="https://vue-email-demo.vercel.app/static/yelp-logo.png" /> -->
        </ESection>

        <ESection :style="content">
          <!-- <EImg
            width="620"
            src="https://vue-email-demo.vercel.app/static/yelp-header.png"
          /> -->

          <ERow
            :style="{
              ...boxInfos,
              paddingBottom: 0,
            }"
          >
            <EColumn>
              <EHeading
                style="font-size: 32; font-weight: bold; text-align: center"
              >
                Hola {{ fullName || email }},
              </EHeading>
              <EHeading
                as="h2"
                :style="{
                  fontSize: '26px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }"
              >
                Te mandamos la confirmacion de tu cita para {{ serviceName }} de
                {{ businessName }}.
              </EHeading>

              <EText :style="paragraph">
                <b>Fecha: </b>
                {{ formattedDate }}
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                <b>Hora: </b>
                {{ formattedTime }}
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                <b>Direccion: </b>
                {{ address }}
              </EText>

              <EText :style="paragraph">
                Cualquier duda podes consultar por Whatsapp
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                Si queres cancelar tu cita podes hacerlo desde este link:
              </EText>
            </EColumn>
          </ERow>
          <ERow :style="{ ...boxInfos, paddingTop: '0' }">
            <EColumn :style="containerButton" col-span="{2}">
              <EButton :href="cancelUrl" :style="button"> Cancelar </EButton>
            </EColumn>
          </ERow>
        </ESection>

        <ESection :style="containerImageFooter">
          <!-- <EImg
            width="620"
            src="https://vue-email-demo.vercel.app/static/yelp-footer.png"
          /> -->
        </ESection>

        <EText
          :style="{
            textAlign: 'center',
            fontSize: 12,
            color: 'rgb(0,0,0, 0.7)',
          }"
        >
          © {{ new Date().getFullYear() }}
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
