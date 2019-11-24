<template>
  <b-modal modal-class="vw-modal" id="modal-invite" centered ref="modal-invite">
    <template slot="modal-header">
      <div class="vw-modal__heading">
        <span class="vw-modal__heading-title">Invite Influencer to network</span>
      </div>
    </template>
    <template slot="default">
      <div class="vw-form">
        <b-form-group class="vw-form__group" label="Channel/Profile link of Influencer" label-class="vw-form__label" label-for="influencer-url" :invalid-feedback="influencerUrlFeedback">
          <b-form-input class="vw-form__control" placeholder="Paste link here" id="influencer-url" v-model="influencerUrl" trim @blur="isInfluencerUrlDirty = true" :state="influencerUrlState" @keyup.enter="handleSubmit"></b-form-input>
        </b-form-group>
        <b-form-group class="vw-form__group" label="Influencer's email" label-class="vw-form__label" label-for="influencer-email" :invalid-feedback="influencerEmailFeedback">
          <b-form-input class="vw-form__control" placeholder="Enter email" id="influencer-email" v-model="influencerEmail" trim @blur="isInfluencerEmailDirty = true" :state="influencerEmailState" @keyup.enter="handleSubmit"></b-form-input>
        </b-form-group>
      </div>
    </template>
    <template slot="modal-footer">
      <b-button :class="inviteButtonClass" @click="handleSubmit">
        <b-spinner small v-if="isSending"></b-spinner>
        <span v-else>Invite</span>
      </b-button>
      <b-button class="vw-button vw-button--outline-secondary" @click="handleCancelClick">Cancel</b-button>
    </template>
  </b-modal>
</template>

<script src="./ModalInvite.js"></script>
