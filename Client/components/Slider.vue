<template>
  <div class="app-slider">
    <carousel
      :perPage="1"
      :paginationEnabled="false"
      :navigationEnabled="true"
      :mouse-drag="true"
      :touch-drag="true"
      :navigationNextLabel="navigationNextLabel"
      :navigationPrevLabel="navigationPrevLabel"
    >
      <slide v-for="(chunkedFile, index) in chunkedFiles" :key="`chunkedFile${index}`">
        <ul class="slider-item" >
          <li v-for="file in chunkedFile" :key="file" :class="{'active': value == file}">
            <div class="overlay" @click="setFile(file)"></div>
            <div class="image"
              :style="{'background-image': `url(${require(`~/assets/avatars/${file}`)})`}">
            </div>
          </li>
        </ul>
      </slide>
    </carousel>
  </div>
</template>

<script>
  export default {
    data: () => ({
      files: [
        'icon_bakyura.png', // Classic Icons
        'icon_kanra.png',
        'icon_gg.png',
        'icon_setton.png',
        'icon_tanaka.png',
        'icon_zaika.png',
        'icon_zawa.png',
        'icon_eight.png',
        'icon_kakka.png',
        'icon_bakyura-2.png',
        'icon_gaki-2.png',
        'icon_junsui-2.png',
        'icon_kanra-2.png',
        'icon_kuromu-2.png',
        'icon_kyo-2.png',
        'icon_naruto_uzumaki.png', // Naruto
        'icon_sasuke_uchiha.png',
        'icon_sakura_haruno.png',
        'icon_sai.png',
        'icon_kakashi_hayate.png',
        'icon_yamato.png',
        'icon_kushina_uzumaki.png',
        'icon_minato_namikaze.png',
        'icon_rock_lee.png',
        'icon_hinata_hyuga.png',
        'icon_ino_yamanaka.png',
        'icon_karin.png',
        'icon_tobi.png',
        'icon_itachi_uchiha.png',
        'icon_sasori.png',
        'icon_deidara.png',
        'icon_konan.png',
        'icon_pain.png',
        'icon_madara_uchiha.png',
        'icon_brs.png',
        'icon_konoha.png',
        'icon_koujaku.png',
        'icon_laxus_dreyar.png',
        'icon_gajeel_redfox.png',
        'icon_ichigo.png',
        'icon_captain_america.png',
        'icon_l.png',
        'icon_tesuya_kuroko.png',
        'icon_aisaka_taiga.png',
        'icon_chat_noir.png',
        'icon_trafalgar_law_2.png',
        'icon_haise_sasaki.png',
        'icon_jungkook.png',
        'icon_hinata_shoyo.png',
        'icon_jushiro_ukitake.png',
        'icon_toaru_majutsu.png',
        'icon_shinra.png',
        'icon_rainbow_dash.png',
        'icon_rikka_takanashi.png',
        'icon_yui.png',
        'icon_tsubomi_kido.png',
        'icon_rias_gremory.png',
        'icon_lucky_dog.png',
        'icon_loke.png',
        'icon_yandere_chan.png',
        'icon_keiva.png',
        'icon_linkin.png',
        'icon_rin_kagamine.png',
        'icon_ayano_tateyama.png',
        'icon_kirito.png',
        'icon_princess_of_the_crystal.png',
        'icon_charles.png',
        'icon_lisanna_strauss.png',
        'icon_mary_kozakura.png',
        'icon_kisuke_urahara.png',
        'icon_kurosaki_2.png',
        'icon_camilla.png',
        'icon_kanata_nanami.png',
        'icon_franky.png',
        'icon_zoro.png',
        'icon_bisca_connell.png',
        'icon_gray_fullbuster.png',
        'icon_luffy.png',
        'icon_mary_read.png',
        'icon_suzuya_tohzuki.png',
        'icon_jura.png',
        'icon_yoruichi_shihon.png',
        'icon_alzack_connell.png',
        'icon_taiga_kagami.png',
        'icon_kaito.png',
        'icon_hibiya.png',
        'icon_gigi.png',
        'icon_lady_bug.png',
        'icon_clear.png',
        'icon_asuna_yuki.png',
        'icon_iku_mizushima.png',
        'icon_sanji_2.png',
        'icon_saitama.png',
        'icon_rin_okumura.png',
        'icon_brook_2.png',
        'icon_ene.png',
        'icon_merry.png',
        'icon_atsushi_murasakibara.png',
        'icon_baymax.png',
        'icon_black_widow.png',
        'icon_heather_mason.png',
        'icon_troll_yatogami.png',
        'icon_dj_sona_kinetic_skin.png',
        'icon_claire_stanfield.png',
        'icon_noiz.png',
        'icon_subaru_sakamaki.png',
        'icon_tsubasa_amaha.png',
        'icon_azusa_kinose.png',
        'icon_chopper.png',
        'icon_loki.png',
        'icon_ulquiorra.png',
        'icon_lucy_hearfilia.png',
        'icon_dracule_mihawk.png',
        'icon_makarov.png',
        'icon_shiki_kagurazaka.png',
        'icon_orihime.png',
        'icon_sting_eucliffe.png',
        'icon_homare_kanakubo.png',
        'icon_nami_2.png',
        'icon_kira.png',
        'icon_ooshirou_shirogane.png',
        'icon_majora.png',
        'icon_nick_fury.png',
        'icon_miku_hatsune.png',
        'icon_misaka_mikoto.png',
        'icon_iron_man.png',
        'icon_uryuu.png',
        'icon_pandaman.png',
        'icon_ryunosuke_miyaji.png',
        'icon_grimmjow_jaegerjaquez.png',
        'icon_ezra_scarlet.png',
        'icon_jellal_fernandes.png',
        'icon_rukia.png',
        'icon_erika_karisawa.png',
        'icon_heroine.png',
        'icon_rogue_cheney.png',
        'icon_luka_megurine.png',
        'icon_soi_fon.png',
        'icon_oreki_houtaro.png',
        'icon_abysus.png',
        'icon_gildarts_clive.png',
        'icon_eustass_kidd_2.png',
        'icon_katsura_kotarou.png',
        'icon_chad.png',
        'icon_espurr.png',
        'icon_wendy.png',
        'icon_bina.png',
        'icon_cordelia.png',
        'icon_hawkeye.png',
        'icon_kaneki.png',
        'icon_grimmjow.png',
        'icon_toma.png',
        'icon_707.png',
        'icon_harpy_monet.png',
        'icon_king_izaya.png',
        'icon_ikki.png',
        'icon_zoro_2.png',
        'icon_marco_bodt.png',
        'icon_yoh_tomoe.png',
        'icon_aoba.png',
        'icon_ren.png',
        'icon_ussop.png',
        'icon_chopper_2.png',
        'icon_decim.png',
        'icon_kisaragi_momo.png',
        'icon_raishin.png',
        'icon_gin_ichimaru.png',
        'icon_ussop_2.png',
        'icon_luffy_2.png',
        'icon_hulk.png',
        'icon_kisaragi_shintaro.png',
        'icon_piko.png',
        'icon_lyon_vastia.png',
        'icon_tsukiko_yahisa.png',
        'icon_robin_2.png',
        'icon_cyber_frey.png',
        'icon_hichigo.png',
        'icon_akari.png',
        'icon_slenderman.png',
        'icon_kazuki_shiranui.png',
        'icon_chitoge_kirisaki.png',
        'icon_ryuji_takasu.png',
        'icon_nio_hashiri.png',
        'icon_millianna.png',
        'icon_edward_elric.png',
        'icon_shintaro_midorima.png',
        'icon_anna_black.png',
        'icon_nelliel_tu_odelschwanck.png',
        'icon_rhys.png',
        'icon_ultear_milkovich.png',
        'icon_robin.png',
        'icon_kousuke_seto.png',
        'icon_avatar_zeref.png',
        'icon_ukyo.png',
        'icon_izayoi_sakamaki.png',
        'icon_akashi_seijuro.png',
        'icon_ven.png',
        'icon_sei.png',
        'icon_thor.png',
        'icon_accelerator.png',
        'icon_kyouka_izumi.png',
        'icon_haruhi_suzumiya.png',
        'icon_daiki_aomine.png',
        'icon_sanji.png',
        'icon_katarou_hoshizuki.png',
        'icon_shinjiro.png',
        'icon_cana_alberona.png',
        'icon_juvia_loxar.png',
        'icon_tobio_kageyama.png',
        'icon_shuuya_kano.png',
        'icon_haruki_naoshi.png',
        'icon_hayato_aozora.png',
        'icon_misaka_yata.png',
        'icon_mavis_vermilion.png',
        'icon_franky_2.png',
        'icon_levy_mcgarden.png',
        'icon_kamijou_touma.png',
        'icon_mirajane_strauss.png',
        'icon_manabizaki_kyou.png',
        'icon_shusei_kagari.png',
        'icon_shin.png',
        'icon_asuka_conell.png',
        'icon_ryoya_kise.png',
        'icon_nami.png',
      ],
      navigationNextLabel: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>',
      navigationPrevLabel: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"/></svg>',
      //currentFile: null,
    }),
    props: {
        value: {
            type: String,
        }
    },
    computed: {
      chunkedFiles() {
        let files = Array.from(this.files)
        var results = [];
        while (files.length) {
            results.push(files.splice(0, 15));
        }
        return results;
      }
    },
    methods: {
      setFile(file) {
        this.$emit('input', file)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-slider {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    max-width: 320px;
    align-content: flex-start;

    li {
      margin-right: 4px;
      margin-bottom: 4px;
      position: relative;

      .overlay {
        position: absolute;
        background: rgba(0,0,0,0.3);
        border-radius: 20%;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .image {
        width: 55px;
        height: 55px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border: 2px solid white;
        border-radius: 20%;
      }

      &:hover, &.active {
        .overlay {
          background: transparent;
        }
        .image {
          border: 2px solid #FFF;
        }
      }
    }
  }

  @media screen and (max-width: 425px ){
    ul {
      max-width: 220px;

      li {
        .image {
          width: 35px;
          height: 35px;
        }
      }
    }
  }

</style>