<template>
  <div class="d-flex justify-content-center align-items-center" v-if="isLoading">
    <b-spinner variant="primary" label="Spinning"></b-spinner>
  </div>
  <b-container class="vw-info" fluid v-else>
    <influencer-general-info
      v-if="influencerData"
      :data="influencerData"
    />
    <influencer-basic-info
      v-if="influencerData && cityList"
      :data="influencerData"
      :genderOptions ="genderEnum"
      :occupationOptions="dataHub.occupation"
      :topicOptions="dataHub.topicOfInterest"
      :cityOptions="cityList"
      :maritalStatusOptions="maritalStatusEnum"
      :kidOptions="kidsEnum"
      :styleOptions="dataHub.style"
      :brandOptions="dataHub.brand"
    />
    <influencer-address-info
      v-if="influencerData"
      :data="influencerData"
      :cityOptions="cityList"
      :districtOptions="districtList"
      :wardOptions="wardList"
      :addressTypeOptions="addressTypeEnum"
    />
    <influencer-identity-info
      v-if="influencerData"
      :data="influencerData"
      :cityOptions="cityList"
    />
    <influencer-bank-info
      :data="influencerData"
    />
    <influencer-contact-info
      :data="influencerData"
    />
    <influencer-cost-info
      :data="influencerData"
    />
    <b-row class="vw-info__form-row">
      <b-col class="vw-info__form-col" cols="12">
        <hr class="vw-info__break-line" />
      </b-col>
    </b-row>
    <b-row class="vw-info__form-row vw-info__form-bottom-row">
      <b-col class="vw-info__form-col vw-info__form-col--align-right" lg="3" md="4" sm="6" cols="12">
        <b-button class="vw-button vw-button--primary vw-button--large" @click="handleSubmitClick">
          <b-spinner small v-if="isSubmitting"></b-spinner>
          <span v-else>Save</span>
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script src="./Info.js"></script>
<style src="./Info.scss" lang="scss" scoped></style>
