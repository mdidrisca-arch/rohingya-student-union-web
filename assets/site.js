/* RSU site script - shared by every page. Page-specific features check that their elements exist before running. */
function updateNavPill() {
  var pill = document.getElementById('navPill');
  var navLinks = document.querySelector('.nav-links');
  var activeBtn = document.querySelector('.nav-links li a.active');
  if (!pill || !navLinks || !activeBtn) return;
  var navRect = navLinks.getBoundingClientRect();
  var btnRect = activeBtn.getBoundingClientRect();
  pill.style.left = (btnRect.left - navRect.left) + 'px';
  pill.style.width = btnRect.width + 'px';
  pill.classList.add('is-set');
}
updateNavPill();                                  /* place the pill straight away on each page load */
window.addEventListener('load', updateNavPill);
window.addEventListener('resize', updateNavPill);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateNavPill);   /* web fonts change link widths */

function toggleMobileMenu() {
  document.getElementById('mobileDrawer').classList.toggle('open');
  var trigger = document.getElementById('mobileTrigger');
  if (trigger) trigger.classList.toggle('active');
}

/* Gallery lightbox - reuses the same photo set as the hero slideshow */
var galleryImages = [
  'https://blogger.googleusercontent.com/img/a/AVvXsEgRBqIKk0RTlPzCNoMjxHVSQbV0m4Nj3XLlebsyYObKtaR5ywWxKRiJiNuuhT_-5mXJ_tX0lWk7sMe4kzsURIptqh0UzxKNJVMYuX5oIXGZv8_7wo0ujV5Vwoc6dfNCCVoWrRgvEL7ZRI4gI0OrKl8mzi8dN0pbcvVBzJuV893pe3T2MBnBw1EZMcFWVd4',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhJYGkwC4oq1xrHBT8XGCd8MSy7Jobrjs3qLFuBQUezWtr87FUovFjLS7F8MGMy0lnrj9IxnQ662swpUr2U_HMCwThkrbbmdgPZDDoAcvZ6nb4bZ9LrY8R0fsGgea6sCYRH8prLeAsAfXS00f75NcMAchGXn9Nm1d4zPWS05bvgrTL8PhAem9_01reNdnA',
  'https://blogger.googleusercontent.com/img/a/AVvXsEh8eFzPo2fgLiiVd3dwcBZmnWffQ4zKjjwHXN9i6CBMpX3f8yMci-mVEV255F8WEKS7fdtSQS2p_vc3bYLibiXKt1gn7PSyjWGxi565W6Sxjqx4PsJ8DkxPu_FDYCRFjRJNH9Y8ZiBkG7BPwDsNFYUbA9CFQpVjP_Qfo24I0QwqEUpzZxuhBNr5A9rnN2k',
  'https://blogger.googleusercontent.com/img/a/AVvXsEizMF7NHhKvqULIKy2cQnqfDXytfBIOk75nXbLnxLuNT_9TvV8dSzpoHFbYEFxceQO1uFvSJVLKMtGTrk0NOphdRUgOjByIzAUfQ1mhq9ncoC7gHFA5qIaSeDnUW_3cOk1TX05wnRyqfZTuzkhAG8zF3azDszLFIjS1m47LCTbQuUv7McimNAM632GgJNY',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhvzFbbuaTOJd7Kt502sFkXPfYlFogXAVmYNGH4ZPvT8WQs_SRzyU8TNryGJhskSJAKPT3NJCTA4JsyBXVoUDEDQJGhzlZinwhfv0yRa0-n3Oi2o85RUYVo1gnmN3qhyEhh4pCsBRH5jqY7-daiCjmQOjJ_tS10IWrx3KriHDlT07bb5Fj6u2bCT-lkv0/s1600/482345981_948614794121261_2449361324665940263_n.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2Az7HpC54ejL0uRy6c9eYSZj2bswsvIGN9ql7D42Lxco25yxZmLUlahlIWKzwQebH2mHMZqp8BoieQtWYCuRoQ2llI1Wcx5IyyeVMJXtJI-GUosooe0YgPc72PvR1QviO1j0hiwv8ZReWeDzX5j9zWVy2Umk3oC6DL8Gdw8hjvsyIBJIm0WZwiP-JU2w/s1600/483066106_949182020731205_5592033739915993517_n.jpg',
  'https://blogger.googleusercontent.com/img/a/AVvXsEienVREErHKXc6xtbfLsQpdO6SuzfM7LXrBZv1ZLvge74etYzvUcvpDCKXi5P-DCC98lE899A4INAGFzOI6XuTKGPdxQjMRtDDJcz786d7tvMPMaGc32HPIOjfGv3N2_XwW2BJgnRksqR_13otbSGJ_pjC17ULyHBp8X_OjwUZUm91FhJlpHmsRpufchdM'
,
  'https://blogger.googleusercontent.com/img/a/AVvXsEhvpkbvrZv4PxWkIZlg0fXAtODcfcJONyGzebhLbA5uSO2yXq9_8RTuvtq_0PC-LuHIOYwg0nns_SUGqJGDIUsvntAn065DI76ytP_kmtmMAnoo8hp2Cvfg-juIeJKIw_R21s4NluaEsXO9AcMeu9D1vk5E0eDwvI9AT2w1ulL4cZp-tGQE6z0vLxdHYus',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgif1Mamwm9CgKee_zFQ7WpvLheFfP1zSK5rThQOch_vPyfElIz47OfwJlgaxjZ_wncm3CeCQvwlgP6tPQV_DAhosIvoegg2Afo5kdVteaIq5X4DSrUyS0wNAjBQGMHaYvUpZWAkhs4rZSMF4dDyyyzl6Zi3b-sbhIZ23R6YhX7bFiQoqP1J5ULoyqxiEE',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjDwjDgL1Phuml4HLfSCgIG5-AEhG_CR9LRU10y80aysglxEnGP-3pD2FKRwQ2BO44YNtTjlV5KIOngdpqms1hO57IQm0rFobKj9LGFhy5-qVVFhYAfLVWceIOuSapwNVrSM_fK6nJUoeMtGOgZDVPBFU0uZTWJAyoQ1P3UpmY9jxmCZJX3Rt7FRkI3ocY',
  'https://blogger.googleusercontent.com/img/a/AVvXsEg4LmkcJDSyo5D8bWhnDejoFvStLvaUwycybnq19icyC2ydc8g-iPN9r1qKavteVNfqBnFGvKl534dgFEL7xA1-FqykA2JcE1xAQGK6GWFz8lAbxssbocUEfQzakvYBdPoFRjTzYqegu_KTNnZYI96dJ8FtCsLgexN5tDkwXUvE6EM8LKbAgl16Y-uqIig',
  'https://blogger.googleusercontent.com/img/a/AVvXsEi6Qp0uKnufBiFSN1kjOpa0LqjsRRcn5g3Eb_eh9TnMfQ9rVr1wTd312d96SdE99rKrX9MbT3gHHXGGkMbhPciHbUCeM1m3SiPYz6DG4TWAHZRANqQb0jr7Z6wzaG2Zr0WJD3rQ7PBI1L309iKNjjZ7erEv2SoFOpadsFfk-BkL47wiiubwP-BSfjXNN54',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgrx-Rf8DZ9sYmsaALO9PoaGTeYgFtKMzKpfCxlIRFXt8FW-viHSXufhuScQBJcCmlFBhaskPVCM5-vAVjQgzBydYqCIYwYvHZnkqAceuYoY2tphxehiWhMqk7ShQLDC3cdpLBVn3AqR8sQ_3ECjw1mYeSyGuHhECMpJoeyuhNu3rFfrkJtDErPVG2IS6U',
  'https://blogger.googleusercontent.com/img/a/AVvXsEg50pkw6uDYFbocO5yNc367WHy10C960ku42CSrcjj4Vm1K7F_bHlxuwpt_7cO5Reu0QaxBGBv9BHvHCoT74ZhlYf8gH68Vw8-v8-BN_7pdBJqvFRallrbyZuzvx1tGBf4Q0gvAE5IDInuwTKsy3Gk70UN1ruHgkZiUhJrgKqQQt0i17_KiLhwOfIdnVQA',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiU79uNc8TDuLSs53MfVGGVzJ-DyLPEaglo92AYexLuWCCV8H50i9i_m0YL1wydy701oWTF6mrXAfZ3MTKma6YLaMkHb9F4f40WzX5pBTddgYW0hvpG7yA3458dw1QvZJEdQWCGIJ2qJHS_p-96I82x8ckcDIXrIHfUCHDCGNJEFpOb5IvKyEFltCSTiu8',
  'https://blogger.googleusercontent.com/img/a/AVvXsEig4mVjyIrbeKTeSAWJ7dfDIlAWVY0ydgsqdEhYykc42UxvloM-1Kx9E_8Lj7AI-OVe2iMVd1KzpKIiMJuXOt8t0YU0L3OLG5wqONp5t-Iy3e63JrqGdSHC8CBK77yPDDrpD3WAxhRy2OsIof8dDH1jDPJwtPuNZsLC0a9XBx1n1o31ZRb6ogWNEq1lJAc',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgqKlcFhbLssh0ltTI3pdEl3x1A53hy4UVq4FFDr0EChPbAMwOt2M1-QSOvgs1lg-Gzk_eYrzyo-ZKotE0QLT0ZkZs3EHd4Jbxxaacdn6TxPZK8P0p-35MvopXpC6w1Gm6OGmyXry1DzC-Vcv7dCeN7w6BOdOCKfjse9NdK3q3ROegqMiLvQ6eFxpNw3Yo',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgGiLHYNPyMEE0n6yctOTXV_jR7-He-o03yCt9xouV-IUQU5GWtzkpwlCVglH13juFZy3xWGjCLIXGB6jOoNUEV_3aKDvcIUCE9MBSJsC1YL_ltsdDYeapmPO6S9OJiocc5oI1g_XhxtrxGNW61pEYFF4LjNqFi6eLAfEXSBgpmtwJq6irRW3jtvXJPyVk',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiEcSRhAZjsGLY4fXoGr1eDyW27vMICb6gT0cCSK9YgNQIo2a8BGhThxwoWBPK1i5zQgQeuznwFZT3N-4vkPzQFPJlByrWU3sYU7XDGuqLMQOHT-k4wVyLUSDpm5OQcZhcT3PgS4ku2HLFKLcz3ZIDGUw7T71O-VcBAnXTNEo67GMnJcDSL8dT4UxXoj2k',
  'https://blogger.googleusercontent.com/img/a/AVvXsEg-cAyBP_3gwWqgHk6YKWtWOLrAi219XksZarZx234Bj9eT5og9ZqTz5P8KmxNT9x-5w_Ixkjq63wpXUFESFXSCKp5c5tWetw1gb5GOMek9tT6iAkzBgWP-wQ1k5VNh438BZjkvL6VCzSPNsgN14pR6CaUn-KS6k4yTBwJ43lNrxmzDIKtZR5PFGjWc9WE',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiKK2o2COcL_TF3gqnXICKdmQ7K-QQtM1Zfy0ac4Kkuy_1wILEKBrXs7-vZVcdlEvOh10yTyGlEF5J6nN_iJSwQREZqO9-Dq6jtY_qHUG-Gp34-SnHgU5CcNEathPv5rzRUVAG3V0U5RAD9J4mEfxgS-k0BXRvadoh91-1oqmOLOZMqaLQrCgud4G5BhIY',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhSKutIXXZE6EfFj3x_CjJI7tYYb7S-q_sgPp4wPrXJgoHsLUa70qcWK28hLJIKT70ctYVRe5964hAt3dzQtHXnO6AEqCC6FijG0neBqzbAk-OsrJYH2LUNpS63AqTzppZz2dVOatBZGu4nplYMBW3fr-r1EChZjFDfUOO4MX_ISx4tjViNwY1dEU7cebI',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjmaHhdWQdJ-f62vRrziMB-ILosbgbX2obRplsdPJNmJScPPSpFhtxCwzojkFFFYBGMLu3vClkqFwsDKMlzvcXtn3Bu6PT1wARkYEc4bGxuiuMvWnyAdC9ciaE__T6dlFHE4ZUJSmGjdFc8gZzwxRMC4BlUwgOaDJTgIfpUTlGFMRfuVbEf3-4OfDLu2ds',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhax7hY4XRlnhf1pH5P8pi41stBFQvoqXb9CNJsNd2LqOUH1ZZNRWtj4IIvy_3SRBOan504zjLDAYZYGrkjCl2cMUbVK3vv7-WZ2OXudEdzsnSESysq2MyqX42FZ1PGYrSrtC11XkHJzqDWEmORQzemTlIgdOvLOnTb8FSFRgltf7S42fuGbPQeFwZgsyY',
  'https://blogger.googleusercontent.com/img/a/AVvXsEja7l9jJKATQUWfjRB7UXqbfz89vAQipG-EVjehfGkeyHUtn17jmHN66sBPQNU99rXAXaJW8SvDML8kMdrBug-3BSMmwSVMW5ZVCHbgTEOSfRwxfdjbP_KKYgttf2eu8_g_F4xaYaQvy4vJW9a_SrDfnDTrtHkuMognLKc6ol0prT5alWz73_CPLwWnzF0',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgwt_sfBug-Zv_-_uTz78Llgxqb_1drM_1PI1A8TC0j6ezyLIfeJtRVzy6TinVnj2HYiSDL2Y0KwLPqVm3f0cnAKY0HX7lpR-y23CfYI0P5eoE2IK-h6BM6AgYbdYYiKo80E5dl2CT-dFj5KixjfQYj0FboNcoEVOt6MrMaj4jgf1z8ll4wrbtDv92E9pE',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjIpiueEMoTuZpcrjo8khO5SpSIgtXWd8Xqi3Y3bqNkCVry7_eGB1RZzatvj0Bg4jDxIaHACZNhKoib2Ny4CEg94XPnHuSsVQRHrdlEq2Cq7tXeOQDeXFgXujpg00DJPFMl_jpvo_mhOHN7UgZ1jNB-V63O05eqnIlD9-uqKFuDfE_mMGG8jBdY5DW1pjk',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiU8APVTODNPg0ikq226fVSjCCKZg9CIsvOGXEbK7Y60MvIscg8EYgz3aZvHTBCc2IqgO0Wr4rOkIjzJEcllwaPpIIhvMZ3dIS1Xj7AOVzPrGd9zrJU8FXZxq4n08Uik5fDdb1-cIgOWknNnQz2z2pVP4RhUmz9VEtGKBTz0SfII4lu7THSOJP6PTf2_ZQ',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgBaYhm2CS-K80KgflDTIIa5T7XMrn0A9O-0Kik9I8ToZKr3Ae8cHZiE5D0WDRRqycfnqe6xLe2X9Q92k612upi2vLKiMbSkWhAvtKBk173H-4J35ZEqV9_idYdwxfadsbXOKw5-oHylzY778Khx_74PaPYPQrmBU1dTw97taTzsMK_nPDj81KU7dsHJho',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjiR5VugQY4tDnWd_b932y7NAz7mGwLugORBASDOBeZ7A9WukaiqSwxelnfJXUdk4QV6XweKcMTogLtQI8kFrZ6-KXKGmHFqOHEs4Zlpwq_e0qZgaDEEC3C-DnkDCCkYFVHEmzYwfum96k6pRizn-g6UO-BcNn7TLwd_ps4GF1fu0adyzw31nKc-PgFf9s',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhnkLQnLxuRXefy6s3hYb-HqkxFsOYlplivKoqQvMg0bd8vwMvXbDqlpGljvC-lg-lpdzTn364ZllnMGfBFjSmGdkRKGuPi4BMMYPAO202smYXtDsPwJMwm_O1KbpFvw3tBNBwkV2mc7FSsExgPIPWRbPC8K8aYYAMXPpqSVzsdhpEqATUHxOMNryuovq4',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiV5zxtS-4vPMrw5-S26DFQA3GaO4C1E8QuCJJUKYjNupr3pQ67tFSmM0F8gFNkoxQ9NSwuAFZaDG9C7cHKt49D3hjMqU5UslSIuNSLP5qZXb-ijBjI9sz07l2HA5zuhnUCLYAaOv-_QPHRPODLK6DtSbXYJaY33OUHZc7oKoEZcldkJbndrCPiVu7UToM',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjH38sUrePg_ropl6tIu91-NwzfNAkl1UZPAxqharnOhaYGc-T4Oy2WBjxo2waodnRaD_twx_F3GrguPHZ3FYquCWBFO9NHqsZfXVt40jkGhQ-UE0gS95BNFsRIwqJ9-5J0utSbcZ0JW2PfLbn36x_-8JhN9DIamSClvCDG42XYqW9D6-Z-mUwT8wtFTYc',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgQs8bz_suPSjNXFyO1B9QdCkGV2ws-owfxUYz5Ke9mR4pOh_FuTGbxdA9S_tGmnbiZ2crPoJGJSBOarYYduVoyJ7e254gXm07C8Ij9loya_ZWD4HVDX7hp7FeiXwm5NkaxBEvdN6YgLXLkfw3jYtLxCpkyBpQvY2IV7INOED7LR04rWqksJBfsn32Qll4',
  'https://blogger.googleusercontent.com/img/a/AVvXsEj0AIwaAKHQpRnBWtr3sMImZTqs3_zIKZNU9EB8ubO4r19NLLXZi2e4cHsLPOqPc7ECAsM2rUAUCAyWFx1khhv90t8Z8nkmclL-X8faAbKSjFKAOriNrJkFCeCMjx9lY7Jf1tbmsSSkD1e82xVMopciFZFuTq9H-pI4i1B8IthDZ3xBWCWb4lvVaCQTNrA',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjaviQ-EUh_Ekw79arSrN2a12X9u524VMcd8MxzK3fSpbJJq_16C8SoJZ1mszdvNUqa6-m8FjygmaSGXs_pUgzMIsnB8m_fJDOvDUYrZGsXV6b65595kbQ2nZKYh9KNDIXc2hOYdi0eYoK-GhJIXR-B4j3ljKuYle2onUZbLBYNufml19YVGLv8ZTiLsLM',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiJl9QY1Unc7YO3QBe6VvlkZoLVrPEFcaFUXlzgZ3ESmhvbSueSw9IYI728PxfX-ojGUBftomS7QAvuH5RuNzSnWAOUAOin3RRudQ17EfTh4sXdOcv_cBuv9iHjDG9fL0VKqMyx2JfpKnQbvqDe3_fYGjsAE5Mqgju8qduXiPdpFhw_mD6yDK_HiYSzwz8',
  'https://blogger.googleusercontent.com/img/a/AVvXsEid-HQ8nVPLXSx2qYXazErMgBKKzAU0zjuBANbe3Y8KMsMF0K-sNRmZVyZqxhuDbgy5T3-IXxW6DaZ8ryiEVM8PLUYDYAr6jspffXc3CuF5_T3MF9457sdpBeEwb79qC-qmDlg5D-XENtqNueFS0E8oKB58ypkH-ooY7fmHXd2DuXUjSUk68SPoY5EEwbw',
  'https://blogger.googleusercontent.com/img/a/AVvXsEj47Z8iEi4XYFlRb7OBL2RtIminHgv5f-A1QS_jWFQsUBgRrBSnC65frrS3GXgG9XYw2zxBtJOrvDY5BxigMinOKxy2-OP91xOWDePQ4BM595h98vkdzoV1yeJmaBb2WGkDT8JpYtQfE7R39OoNru7YMSg48PDzRHQCioHTtBxZX32LxZ9TIdv636IzTh0',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhWtLvZxtMi8dPrCTYURjUEn-UfHB5lSE6yaqQ7YWz_XzB26dVgiWtjbeZvynRHNbLMLdYESL6BfZh4uFmYVXVUSq0-Y2EbgPWbjKlWV4xUC5MlCSvfNB24KsOpHOkURpF0ylOLZAzcIjiO7L-fe1ONt6pvMfw0WYqIyqk9a45T4Wre9bddBvDi3tIOdDw',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiACH64Btw6uWkaPoGh_NqQA3ev0CLShD_8jGf1qvmYAA2Ivl--0AieVyW8orPbXmSailyn1LSA0HsycRLrxpP53pWsLV4nmFK57m66TCFELwx5uBvqjyiHQU6hMNoxrn-KI8uI2YgyhuPlj4xlteTyMowOCGlLsooWoJM-5VX-ackYNnEGnqSZJfPVSyY',
,
  'https://blogger.googleusercontent.com/img/a/AVvXsEhqtbG0lLsEgoV6Uyh6lbNmkcGx80wAV5NljIFFsBfD3sAbpV_S8Rq0jkgDtquorPIM07NCDsFCmI25SdMrb8t5giAIxGO-bboEXU0sejUemRuIZOprpkuZ8rYxlRY7yV-MAc0xEbipD2q7eEqVgF1zwvl7Z-GmHkvDYftvhcszet-Y4MGVURKmaGjgBlc',
  'https://blogger.googleusercontent.com/img/a/AVvXsEj-F3d9p82ubbVH7UJDnuGzAx6dO2IAZgtP4-9AGfdO4MgvxVdNYDccWLOCxPQ1su4xeBmnbCg26MJfYkxnOvxCPQJAMcRKElxVTt0Lo4dw-kjCL4SMHB7dR00ozOqzRuhH0oLacoJnO2I9CYZSnbljWy1kf3u4yZ46GR348Z-qw1qTnjOI99rbaC94cYU',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjQKvZs3LgrU2-lzq3abQ8jay0kNbstApKTk0bHAk2z53XJ3LAZzk8S6vVazT-HbJ1PNG9o-KxXZo70HeRGtiUEkhkbfY5e-6_yPgFY0fPzwK7YMzP6FNjNAS4wUTVt1ieoL3KnTl9GUHslGbmpzmueqbAUnnvIexEnMJUjWAQkpQNmjdCCGIvIo0ZmCPw',
  'https://blogger.googleusercontent.com/img/a/AVvXsEiCPAVUkXBMybROpu8FW5QSG8jJFV0Gdfubr725y7aRUSKWTzxXMoxkrYyJKUdfj1fjsyo0mSpfod62GopqmUIbChJ0kGf5xeOMjqDJxWYzW83qYxRn8d-CZ_2uE4EGx9977oKhiyguvVzBJO5iHtP7VgVQULxNEuWP2_v4oxx4mGzwyh6OyOUpIINpBfY',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjzuRxCfmjFiyYWsFoZv3Agm-MVLkyLZieWqPNoIuQOqJmyNr_HtguygnqNNIy5gCF0MeeFZ1X78rwWsAMbcooqbw3t0cyl0GTnBjzFq1qWjj5SJJwxULm0UijNt0jzuUEKqMcZ2GDO0vH7Zl08JVROQqMlm48WQC3JW-QqQdHje_0SDOUjg9G2ezKE5UU',
  'https://blogger.googleusercontent.com/img/a/AVvXsEggHVzh6OU21b2T8a-RT15oAUlaCdV2EuFPKsc_vU8pdpoh4FqkbP-9MOf9xXsUi5O2WfNyJd0JfjKYEybCoyNqVvA9U3Bfrrd0ZGxNWxXtJbgPy1sGJQEmNoQmTGN4llToBBAe3VWt6sKZtKUTx5KxeNL63TZAsKyRHU7fAkff1IA1yGwtHm0k-MEFxms',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhbTjI-OyWYIaCZrMzhNgGpd5yznyegYKhhIFcfTp-hUSSlovJ6XHYVqmxD19ZnJQwGQTqATCj3-XQtblkB8W9-chW251B5lhfH-iXkCqEQU2kH1NGobtzVjeIEKleFrOSC0kIHHGLh4lZrxHtN9V2H7_TykzA90a61XEv-Dez2QMw1f1uORRDMnp6fhLo',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhINs52426utD3pbhSZWeYBGVQaU_c0lPfhTC-u2jE2f0Z10zKRv1tBN6CdCdzF3abf_FKz69w-fBZYeCXipGNxvCJXYqShQ6KPYX_GGGbrbF8qj2_ehBWx3WABLJ_xvtIabv7sPmkUj-bpmTVmDXkRQpHBNhzWe9GRC5K3Kn4AgrcZ1aypAy7PmUtAhW0',
  'https://blogger.googleusercontent.com/img/a/AVvXsEikVHc48aW8_8jGKMnzGsf4rrSfbl1D-5U05XmdcGP4um3So1FlOIdIbp9lyxf6h2WugR_XUcaJujafwoqzAcB57UEJilIl6pmt6MFuCaSdWQkJnr6wzSwlllCqHCo9cE1cOhmTkjfpJ05BiVVBznJD1dubkhY2q9gXmnW7_iSg8Pu-U7OAvmYi-9XH-4E',
  'https://blogger.googleusercontent.com/img/a/AVvXsEj6r1WahgHhRtIKYgKOcj-OIcV0YFflRuXxcP1H1xfzQxugNEO2N-OIMvLZlo4NgvmyMLwyILcY9-BvUIIFRVGJJcNhP8pz3zubIHF-YcEZS7Mv8v5ViGDSeNDi_cMaPu56s9_-6UaUS2tUxhBi6o8M3k5H1VQKG__MsLl99rx1_8BLKaCW8VV6sg148z4',
  'https://blogger.googleusercontent.com/img/a/AVvXsEhFbzvCW0-MTBK7GUEiXBcnBowx_pU33jmHVw4dGbMVT_Fn1SYMVfQSMmHDfYJ2BHipLOvEulTi65nNBL6ANjyToPHpoSYvuHwpUs3yCwDlcNKCJK9cTcTLY7ABuiq-Dk918vpbbyZB_sR9zT7-qWNeAGLxf9NDxqz5DYWDuEnm3L7TMyI7xPuZl_w1jPw',
];
var lightboxIndex = 0;
function openLightbox(i) {
  lightboxIndex = i;
  document.getElementById('lightboxImg').src = galleryImages[i];
  document.getElementById('lightboxImg').alt = 'Gallery photo ' + (i + 1) + ' of ' + galleryImages.length;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + galleryImages.length) % galleryImages.length;
  document.getElementById('lightboxImg').src = galleryImages[lightboxIndex];
  document.getElementById('lightboxImg').alt = 'Gallery photo ' + (lightboxIndex + 1) + ' of ' + galleryImages.length;
}
document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

/* Scroll-aware nav (shrinks + gains shadow), top scroll-progress bar,
   and the floating "Donate Now" button (hidden near the top and on
   the contact and donate pages, since the CTA already links there). */
(function() {
  var nav = document.getElementById('globalNav');
  var progressBar = document.getElementById('scrollProgress');
  var fab = document.getElementById('floatingCta');
  var fabPulsed = false;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('nav-scrolled', y > 24);
    if (progressBar) {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }
    if (fab) {
      var onContactPage = ['page-contact', 'page-donate'].some(function(id) {
        var el = document.getElementById(id);
        return el && el.classList.contains('active');
      });
      var shouldShow = y > 400 && !onContactPage;
      var wasVisible = fab.classList.contains('visible');
      fab.classList.toggle('visible', shouldShow);
      if (shouldShow && !wasVisible && !fabPulsed) {
        fabPulsed = true;
        fab.classList.add('pulse-once');
        setTimeout(function() { fab.classList.remove('pulse-once'); }, 2300);
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
  window.addEventListener('resize', onScroll);
})();

/* Hero cursor-follow spotlight: only on devices with a real mouse
   (hover: hover + pointer: fine) and only when the person hasn't
   asked for reduced motion — mirrors the CSS media query above so
   the listener isn't wasted on devices where the glow is hidden. */
(function() {
  var hero = document.querySelector('.hero');
  var spotlight = document.getElementById('heroSpotlight');
  if (!hero || !spotlight) return;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reducedMotion) return;
  var ticking = false;
  hero.addEventListener('mousemove', function(e) {
    var x = e.clientX, y = e.clientY;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var rect = hero.getBoundingClientRect();
      spotlight.style.setProperty('--spot-x', (((x - rect.left) / rect.width) * 100) + '%');
      spotlight.style.setProperty('--spot-y', (((y - rect.top) / rect.height) * 100) + '%');
      ticking = false;
    });
  }, { passive: true });
})();

/* ── Cards on the Advocacy page: "Our Advocacy" and "Our Recents" ──
   Each section is drawn from its OWN data file, so they cannot affect each other:
     Our Advocacy -> assets/advocacy-updates.js   (list name: advocacyUpdates, grid: #programsGrid)
     Our Recents  -> assets/recents-updates.js    (list name: recentsUpdates,  grid: #recentsGrid)
   Cards use exactly the markup and classes the hand-written cards used. This block runs BEFORE the
   tilt and scroll-reveal code below, so those pick the cards up automatically.
   The page already holds a SAVED COPY of each section's cards as ordinary HTML (what visitors without
   JavaScript, and search engines, see). When a data file loads with usable cards, they replace that copy.
   If a data file is missing, broken, or has no usable cards, the saved copy simply stays on screen.
   A report card ({ report: N }) opens report N exactly as before; it needs no other code. The report
   data (progData) is defined further down this file, so the check that N exists is made there. */
(function () {
  var ARROW_ICON = '<svg fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" width="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  var EXT_ICON = '<svg fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" width="14"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>';

  function text(v) { return (typeof v === 'string') ? v.trim() : ''; }
  function make(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt) n.textContent = txt;
    return n;
  }
  /* Only http(s) links and paths on this site are accepted ("javascript:" etc. are refused).
     A path without a leading slash ("assets/x.jpg") is treated as a path from the site root. */
  function safeUrl(v) {
    v = text(v);
    if (!v || /^\/\//.test(v)) return '';
    if (/^[a-z][a-z0-9+.\-]*:/i.test(v)) return /^https?:/i.test(v) ? v : '';
    return v.charAt(0) === '/' ? v : '/' + v;
  }
  /* Report number of a card, or -1 when it is a link card. */
  function reportNo(u) {
    if (!u || u.report === undefined || u.report === null || u.report === '') return -1;
    var n = Number(u.report);
    if (!(n >= 0) || n % 1 !== 0) throw new Error('"' + u.report + '" is not a report number');
    return n;
  }
  /* What makes a card "the same card": its report number, or its link. */
  function cardKey(u) {
    var n = reportNo(u);
    if (n >= 0) return 'report:' + n;
    var l = safeUrl(u && u.link);
    return l ? 'link:' + l : '';
  }

  function buildCard(u, opt) {
    var n = reportNo(u), rep = n >= 0;
    var title = text(u.title);
    if (!title) throw new Error('an entry has no title');
    var link = rep ? '/advocacy/#report-' + n : safeUrl(u.link);
    var external = !rep && /^https?:/i.test(link);

    var card;
    if (rep) {
      card = make('div', 'prog-card prog-card--clickable');
      card.setAttribute('onclick', 'openProgModal(' + n + ')');
    } else if (link) {
      card = make('a', 'prog-card prog-card--clickable');
      card.href = link;
      if (external) { card.target = '_blank'; card.rel = 'noopener noreferrer'; }
    } else {
      card = make('div', 'prog-card');
    }

    var imgUrl = safeUrl(u.image);
    if (imgUrl) {
      var wrap = make('div', 'prog-card-img');
      var img = document.createElement('img');
      img.src = imgUrl;
      img.alt = text(u.imageAlt) || title;
      img.decoding = 'async';
      img.loading = 'lazy';
      wrap.appendChild(img);
      card.appendChild(wrap);
    }

    var body = make('div', 'prog-card-body');
    var label = [text(u.tag), text(u.date)].filter(Boolean).join(' \u00b7 ');
    body.appendChild(make('div', 'prog-card-tag', label || 'Update'));
    body.appendChild(make('h3', 'prog-title', title));
    /* Description: "\n\n" typed inside the quotes starts a new paragraph. */
    text(u.description).split(/\n+/).forEach(function (para) {
      para = para.trim();
      if (!para) return;
      var p = make('p', 'body-sm', para);
      p.style.marginBottom = '16px';
      body.appendChild(p);
    });
    if (link) {
      var more = make(rep ? 'a' : 'span', 'prog-read-more');
      if (rep) more.href = link;
      more.appendChild(make('span', '', text(u.linkLabel) || opt.defaultLabel));
      more.insertAdjacentHTML('beforeend', ' ' + ((external && opt.externalIcon) ? EXT_ICON : ARROW_ICON));
      body.appendChild(more);
    }
    card.appendChild(body);
    return card;
  }

  function renderSection(opt) {
    var grid = document.getElementById(opt.gridId);
    if (!grid) return;
    try {
      var list = window[opt.listName];
      if (!Array.isArray(list)) { if (window.console) console.warn(opt.file + ' did not load - the saved copy of the cards stays on screen.'); return; }
      var seen = {}, frag = document.createDocumentFragment(), shown = 0;
      list.forEach(function (u, i) {
        try {
          var key = cardKey(u);
          if (key && seen[key]) { if (window.console) console.warn(opt.file + ': card #' + (i + 1) + ' repeats ' + key + ' and was skipped'); return; }
          frag.appendChild(buildCard(u, opt));
          if (key) seen[key] = true;
          shown++;
        } catch (err) { if (window.console) console.warn(opt.file + ': card #' + (i + 1) + ' skipped - ' + err.message); }
      });
      if (!shown) { if (window.console) console.warn(opt.file + ' has no usable cards - the saved copy stays on screen.'); return; }
      Array.prototype.slice.call(grid.children).forEach(function (el) {      /* remove the saved copy of THIS grid only */
        if (el.classList && el.classList.contains('prog-card')) grid.removeChild(el);
      });
      grid.insertBefore(frag, grid.firstChild);          /* newest first */
    } catch (err) {
      if (window.console) console.warn(opt.file + ' failed - ' + err.message + ' - the saved copy stays on screen.');
    }
  }

  renderSection({ gridId: 'programsGrid', listName: 'advocacyUpdates', file: 'advocacy-updates.js', defaultLabel: 'Read Full Report', externalIcon: false });
  renderSection({ gridId: 'recentsGrid',  listName: 'recentsUpdates',  file: 'recents-updates.js',  defaultLabel: 'View Post',        externalIcon: true });
})();

/* Subtle 3D tilt on impact/program cards: rotates a few degrees
   toward the cursor, layered on top of the existing lift-on-hover.
   Same device/motion gating as the hero spotlight above. Clearing
   the inline transform on mouseleave lets the card's normal CSS
   hover/default rules take back over immediately. */
(function() {
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reducedMotion) return;
  var maxTilt = 6;
  function attachTilt(card) {
    card.addEventListener('mouseenter', function() {
      card.classList.add('tilt-fast');
    });
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var rx = (py - 0.5) * -2 * maxTilt;
      var ry = (px - 0.5) * 2 * maxTilt;
      card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      card.classList.remove('tilt-fast');
      card.style.transform = '';
    });
  }
  window.attachCardTilt = attachTilt;
  document.querySelectorAll('.impact-card, .prog-card').forEach(attachTilt);
})();

/* Contact form -> mailto: fallback (no backend required) */
function submitContactForm(e) {
  e.preventDefault();

  var name = document.getElementById('cfName').value.trim();
  var email = document.getElementById('cfEmail').value.trim();
  var message = document.getElementById('cfMessage').value.trim();

  if (!name || !email || !message) { return false; }

  var subject = 'RSU Website Inquiry from ' + name;
  var body = 'Name / Institution: ' + name + '\n'
    + 'Email: ' + email + '\n\n'
    + 'Message:\n' + message;

  var mailtoLink = 'mailto:rsu.incamp@gmail.com'
    + '?subject=' + encodeURIComponent(subject)
    + '&body=' + encodeURIComponent(body);

  window.location.href = mailtoLink;

  var successEl = document.getElementById('cfSuccess');
  if (successEl) {
    successEl.classList.remove('is-shown');
    void successEl.offsetWidth; /* force reflow so the draw-in animation can replay on repeat submissions */
    successEl.classList.add('is-shown');
  }

  var hint = document.getElementById('cfHint');
  if (hint) {
    hint.textContent = 'Your email app may be opening with the message pre-filled. It has not been sent yet \u2014 please review it and press Send in your email app yourself. If nothing opened, email us directly at rsu.incamp@gmail.com.';
    hint.style.color = 'var(--green-600)';
    hint.style.fontWeight = '600';
  }

  return false;
}

window.addEventListener('scroll', function() {
  var nav = document.getElementById('globalNav');
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 2px 20px rgba(13,43,31,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

/* Hero parallax */
window.addEventListener('scroll', function() {
  var bg = document.querySelector('.hero-bg');
  if (bg && window.scrollY < window.innerHeight) {
    bg.style.transform = 'translateY(' + (window.scrollY * 0.12) + 'px)';
  }
});

/* Hero background slideshow */
var heroBgIndex = 0;
function heroBgNext() {
  var slides = document.querySelectorAll('.hero-bg-slide');
  if (!slides.length) return;
  slides[heroBgIndex].classList.remove('active');
  heroBgIndex = (heroBgIndex + 1) % slides.length;
  slides[heroBgIndex].classList.add('active');
}
/* Auto-advance only when the person has not asked for reduced motion, and only while the tab is visible */
var heroBgTimer = null;
var heroBgReduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
function heroBgStart() {
  if (heroBgTimer || document.hidden || heroBgReduceMq.matches || !document.querySelector('.hero-bg-slide')) return;
  heroBgTimer = setInterval(heroBgNext, 4500);
}
function heroBgStop() {
  if (heroBgTimer) { clearInterval(heroBgTimer); heroBgTimer = null; }
}
document.addEventListener('visibilitychange', function () {
  if (document.hidden) heroBgStop(); else heroBgStart();
});
function heroBgMotionChanged() { if (heroBgReduceMq.matches) heroBgStop(); else heroBgStart(); }
if (heroBgReduceMq.addEventListener) heroBgReduceMq.addEventListener('change', heroBgMotionChanged);
else if (heroBgReduceMq.addListener) heroBgReduceMq.addListener(heroBgMotionChanged);
heroBgStart();

/* Manifesto slideshow */
var msIndex = 0;
var msDelay = 2800; // ms between slides
var msLast = 0;
var msPaused = false;
function msShow(i) {
  var slides = document.querySelectorAll('.ms-slide');
  var dots = document.querySelectorAll('.ms-dot');
  if (!slides.length) return;
  slides.forEach(function(s, idx) { s.classList.toggle('active', idx === i); });
  dots.forEach(function(d, idx) { d.classList.toggle('active', idx === i); });
  msIndex = i;
}
function msNext() {
  var slides = document.querySelectorAll('.ms-slide');
  if (!slides.length) return;
  msShow((msIndex + 1) % slides.length);
}
function msGoTo(i) {
  msShow(i);
  msLast = 0;
}
/* Driven by requestAnimationFrame instead of setInterval: this ties
   the slide advance directly to the browser's paint loop, which
   starts running as soon as the page renders. Some in-app/embedded
   browsers throttle or delay setInterval/setTimeout timers until the
   user first taps the screen, which caused the slideshow to sit
   still until a click. requestAnimationFrame does not have that
   restriction, so the slideshow now goes live immediately. */
function msLoop(ts) {
  if (!msPaused) {
    if (!msLast) msLast = ts;
    if (ts - msLast >= msDelay) {
      msNext();
      msLast = ts;
    }
  }
  requestAnimationFrame(msLoop);
}
var msEl = document.getElementById('manifestoSlideshow');
if (msEl) {
  requestAnimationFrame(msLoop);
  msEl.addEventListener('mouseenter', function() { msPaused = true; });
  msEl.addEventListener('mouseleave', function() { msPaused = false; msLast = 0; });
}

/* Scroll-reveal: fade/slide elements up as they enter the viewport.
   Progressive enhancement - the reveal-init class (which starts
   elements hidden) is only added here, so if JS fails, content stays
   fully visible by default rather than being stuck invisible. */
if ('IntersectionObserver' in window) {
  var revealTargets = document.querySelectorAll(
    '.value-card, .prog-card, .info-card, .contact-info-card, .contact-form-card, .lead-profile-grid > *, .impact-card, .testimonial-card, .gallery-item, .eyebrow'
  );
  revealTargets.forEach(function(el, i) {
    el.classList.add('reveal-init');
    el.style.transitionDelay = ((i % 4) * 0.08) + 's';
  });
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(function(el) { revealObserver.observe(el); });
}

/* Animated stat counters - counts up from 0 to the target number
   once the stats bar scrolls into view. Years Running is computed
   live from the founding year so it never goes stale. */
var statYearsEl = document.getElementById('statYears');
if (statYearsEl) {
  var yearsRunning = new Date().getFullYear() - 2018;
  if (yearsRunning > 0) statYearsEl.setAttribute('data-target', yearsRunning);
}
function animateStatCount(el) {
  var target = parseInt(el.getAttribute('data-target'), 10) || 0;
  var suffix = el.getAttribute('data-suffix') || '';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = target + suffix; return; }
  var duration = 1400;
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
if ('IntersectionObserver' in window) {
  var statTargets = document.querySelectorAll('.hero-stat-num');
  var statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateStatCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statTargets.forEach(function(el) { statObserver.observe(el); });
} else {
  document.querySelectorAll('.hero-stat-num').forEach(function(el) {
    el.textContent = (el.getAttribute('data-target') || '0') + (el.getAttribute('data-suffix') || '');
  });
}

/* NOTE: reports are identified by their POSITION in this list: report N opens with #report-N, and the
   cards in assets/advocacy-updates.js refer to them as { report: N }. Add new reports at the END of this
   list (so existing numbers never change), then add a { report: N } card to advocacy-updates.js.
   The home page "Latest" section shows the first three entries of this list. */
var progData = [
  {
    tag: 'Education · Train-the-Teacher Workshop',
    title: 'Train-the-Teacher Workshop on Educational Literacy',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikN4QQUukk60Ojc_ozNhwPnDIWroVi_W4FEFRhhqgwEUzNo1-VrbbS1wvcUA86lFelmoQho_HquCCxiWkFGssDLXg-XQAaQngB8EdqGwYSPYMN49yyoDB7myRtg23eERtN5NeV1fgQDDuP4RrQZA09NxrcesV0lEqgwy6cavJjW9XejBNSTcE-wEuCVOs/s2048/643414370_1221653586817379_6580813680708586534_n.jpg',
    meta: [
      { label: 'Trainer', val: 'Engr. Muhammad Furquan Mirza' },
      { label: 'Venue', val: 'TİKA Computer and Robotics Lab' },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' }
    ],
    sections: [
      { heading: 'Overview', type: 'prose', content: 'The Rohingya Student Union (RSU) successfully conducted its first Train-the-Teacher Workshop on educational literacy, aimed at bridging the education gap for every child while prioritizing girls\' access to learning. The session focused on modern teaching methods, creating an inclusive and effective classroom environment, and ensuring strong safeguarding measures for girls and all students.' },
      { heading: 'Session Focus', type: 'list', content: ['Modern teaching methods for diverse classroom settings', 'Creating inclusive and effective learning environments', 'Ensuring strong safeguarding measures for girls and all students', 'Bridging the education gap for every child in the community', 'Practical teaching tools and interactive learning strategies'] },
      { heading: 'Impact', type: 'prose', content: 'The training was led by Engr. Muhammad Furquan Mirza and held at the TİKA Computer and Robotics Lab, providing teachers with hands-on skills to transform their classrooms into safe, inclusive, and effective spaces for every learner.' }
    ]
  },
  {
    tag: 'Skills for Advocacy · Session 8/12 · Human Rights',
    title: 'Introduction to Human Rights',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0Yiyk60GG9YsKkeJgqOB7W45cZF4Yf1OJJH-1z5AJtrWU_8r0pEbEYe7uCY926r7yjZrZkLrNEny2mouxeOsHRXqgLR1wbcgJX31hwBnB_IXJ7YJrhx6kJyf6Fs6mTm3fg3ixMoXBBIkXwTADhI-nJbjlWX8CrhDdMWiN1zXlSHQuWxy-gobY2giy2yU/s2048/484043856_950005650648842_1146111830082606848_n.jpg',
    meta: [
      { label: 'Training Title', val: 'Introduction to Human Rights' },
      { label: 'Trainer', val: 'Nezam Uddin (Lawyer and Legal Professional)' },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' },
      { label: 'Date', val: '27th April' },
      { label: 'Session', val: '8 of 12 — Skills for Advocacy' }
    ],
    sections: [
      { heading: 'Overview', type: 'prose', content: 'The Rohingya Student Union successfully conducted the 8th session of the Skills for Advocacy training focused on Human Rights. Facilitated by Mr. Nezam Uddin, this training aimed to provide in-depth legal information to the participants with essential skills related to Human Rights. Participants actively engaged in discussions and interactive activities, gaining valuable insights and practical knowledge on how to effectively engage with communities for advocacy purposes.' },
      { heading: 'Key Topics Covered', type: 'list', content: [
        'Understanding of Human Rights and Fundamental Rights',
        'Overview of the Universal Declaration of Human Rights (UDHR)',
        '1951 International Refugee Convention and 1967 Additional Protocol',
        'International Covenant on Economic, Social, and Cultural Rights (ICESCR)',
        'International Covenant on Civil and Political Rights (ICCPR)',
        'Convention on the Elimination of all Forms of Discrimination Against Women (CEDAW)',
        'Convention on the Rights of the Child (CRC)'
      ]},
      { heading: 'Acknowledgement', type: 'prose', content: 'We extend our sincere appreciation to our trainer, Mr. Nezam Uddin, for his informative facilitation, as well as to all the participants for their enthusiastic involvement and dedication throughout the training session.' }
    ]
  },
  {
    tag: 'Skills for Advocacy · Session 6/12 · Photojournalism',
    title: 'Photojournalism Training',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYvFQLRFbTgM6cyVP8SawfOHWAFoEgnGLeGL9lO1OiO373a8gPrv11rSzGS51QSdmNKTEFnhEnxwGEAnF7m8ahik10cRNTdx0nhGGqzYV4SVFtdnadHmhUZ9h-hpKD16kWOybFskx_4SxltWxLiaZb3aeRz1yKFfn5kcU6Zy00QfzwDsKuFIn9VpQMX-4/s2048/480612699_950627720586635_4699305135200217118_n.jpg',
    meta: [
      { label: 'Training', val: '6/12 Comprehensive Skills for Advocacy' },
      { label: 'Date', val: '07/04/2024' },
      { label: 'Topic', val: 'Photojournalism' },
      { label: 'Trainer', val: 'Abdullah (Khin Maung Thein)' },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' }
    ],
    sections: [
      { heading: 'Overview', type: 'prose', content: 'The Rohingya Student Union conducted a training session on Photojournalism led by our award-winning photographer Abdullah. Participants learned about the fundamentals of photojournalism, photography techniques, and writing effective photo captions. Mr. Abdullah provided valuable insights and practical tips to enhance participants\' advocacy skills through visual storytelling.' },
      { heading: 'Topics Covered', type: 'list', content: ['What is Photojournalism', 'Photography Techniques', 'Writing Photo Captions', 'Visual storytelling for human rights advocacy', 'Using images to communicate social issues effectively'] },
      { heading: 'Outcome', type: 'prose', content: 'The session was engaging and informative, empowering participants to effectively communicate social issues through compelling images. We thank Abdullah for his expertise and look forward to seeing the impact of visual storytelling in advocacy efforts by RSU members.' }
    ]
  },
  {
    tag: 'Skills for Advocacy · Session 4/12 · Research Methodology',
    title: 'Research Methodology',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4MUU7xDmz24-FEzg97ZOgMHEynTaRkQyXy4BCTWSUe6H452iFkn5YCXQdyxhMl1C2vkSg71bMRWZNePDSh30yWtWhMJ-ZXjkC1Qu6MhxnTOSjR5ZY2aHZK_DrQnS46iQCu6YDyhSVkRM9vFGUw-sUUbfn_hp518Jy5oMUvU65e2aNy-bbPIL7xL8Q5cM/s320/482033142_950616090587798_5192982234632189680_n.jpg',
    meta: [
      { label: 'Training Title', val: 'Research Methodology' },
      { label: 'Session', val: '4 of 12 — Skills for Advocacy' },
      { label: 'Date', val: '23 March 2024' },
      { label: 'Time', val: '9:30 AM to 1:00 PM' },
      { label: 'Trainer', val: 'M. Furquan Mirza' }
    ],
    sections: [
      { heading: 'Training Objectives', type: 'list', content: [
        'Provide participants with a comprehensive understanding of research methodology',
        'Familiarize participants with various types of research and their applications',
        'Equip participants with practical skills in literature review, research design, data collection, and analysis',
        'Raise awareness about ethical considerations in research',
        'Enable participants to develop clear and effective research proposals'
      ]},
      { heading: 'Training Agenda', type: 'list', content: [
        'Introduction to Research Methodology',
        'Literature Review',
        'Research Design',
        'Data Collection Methods',
        'Sampling Techniques',
        'Data Analysis',
        'Ethical Considerations',
        'Writing Research Proposals',
        'Practical Exercises and Case Studies',
        'Q&A and Discussion',
        'Conclusion'
      ]},
      { heading: 'Training Outcomes', type: 'list', content: [
        'Participants gained a clear understanding of the importance and purpose of research methodology',
        'Participants could differentiate between qualitative, quantitative, and mixed-methods research',
        'Participants learned the process of conducting literature reviews, including searching, selecting, synthesizing, and identifying gaps',
        'Participants understood the considerations involved in research design, including defining objectives and choosing appropriate methods',
        'Participants familiarised themselves with various data collection methods and sampling techniques',
        'Participants gained insight into data analysis techniques, including both statistical and qualitative analysis',
        'Participants understood ethical considerations in research and how to address them',
        'Participants learned the components of writing research proposals and received tips for effective proposal writing',
        'Participants engaged in practical exercises and case studies to apply their knowledge'
      ]},
      { heading: 'Action Items', type: 'list', content: [
        'Provide participants with training materials and resources for further reading',
        'Collect feedback from participants to evaluate the effectiveness of the training and identify areas for improvement'
      ]}
    ]
  },
  {
    tag: 'Disaster Preparedness &#183; Batch 3',
    title: 'Disaster Risk Management Training',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhspRcyH37jCM3zPDKsfUlZOMSRYPaQace2K4hJEZ6g6Zg5663JMRcEePAmd4wUh3caa_iKO-USRWQ57aSb4K6aik2Fbani__tSwTi8a2BYkZxwcN7JmevJA6-IhPcvhK6n-M1yF2mkjAZzGNAkQt92ELsueNd-rRKtFmB2cqes2KNYNiz11YZnbRSWdt0/s2048/482201294_948604717455602_1558052512247191560_n.jpg',
    meta: [
      { label: 'Training Title', val: 'Disaster Risk Management Training &#8212; Batch 3' },
      { label: 'Date', val: '24&#8211;25 November 2023' },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' },
      { label: 'Implemented by', val: 'Team Shofiullah Khata (Camp 16)' }
    ],
    sections: [
      { heading: 'Overview', type: 'prose', content: 'The Rohingya Student Union (RSU) successfully completed the third batch of its two-day Disaster Risk Management (DRM) Training on 24&#8211;25 November 2023, bringing together dedicated participants committed to strengthening disaster preparedness and emergency response within the Rohingya refugee camps. Living in one of the world\'s most disaster-prone humanitarian settings, refugees frequently face hazards such as fires, landslides, floods, heavy rainfall, and cyclones &#8212; and this training equipped them with the practical knowledge, technical skills, and confidence needed to respond effectively during emergencies.' },
      { heading: 'Training Modules', type: 'list', content: [
        'Disaster Planning &#8212; risk assessment, contingency planning, and community coordination',
        'Basic Psychological First Aid &#8212; emotional support and psychological care for disaster-affected individuals',
        'Disaster Rescue Mechanisms &#8212; essential rescue techniques and safe evacuation procedures',
        'Medical First Aid &#8212; practical first-aid skills for immediate assistance',
        'Emergency Response Mechanisms &#8212; rapid response, coordination, communication, and mobilization',
        'The Importance of Feedback &#8212; using reflection and evaluation to improve future preparedness initiatives'
      ]},
      { heading: 'Acknowledgement', type: 'prose', content: 'RSU extends its sincere appreciation to all participants whose enthusiasm and active engagement made the training a success, and to its dedicated trainers for creating a meaningful learning experience. This training was implemented by Team Shofiullah Khata (Camp 16), whose dedication contributed significantly to strengthening community resilience within the camp.' }
    ]
  },
  {
    tag: 'Disaster Preparedness &#183; Batch 4',
    title: 'Disaster Risk Management Training',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYSN11g4sYC_RUP4ynNtVkzugHmXiIu3ywN5pDinhIlHKeus0EbGjM1UFOFWAxeYEDRReSegYkHvpW3HY8nHWia2FzgPN4NAz4b623gjmbK9pd1aOmRKLtfMHowtRUrAqI8-4x3vAEiTIZOPlDUp2OxG-AEf28p5OYEIB7Xnmx5BtDR5nVTi1cvkXmlUc/s2048/483101284_948614664121274_9198498412357262276_n.jpg',
    meta: [
      { label: 'Training Title', val: 'Disaster Risk Management Training &#8212; Batch 4' },
      { label: 'Date', val: '1&#8211;2 December 2023' },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' },
      { label: 'Implemented by', val: 'Team KTP-01E' }
    ],
    sections: [
      { heading: 'Overview', type: 'prose', content: 'Building on the success of previous sessions, RSU conducted the fourth batch of its Disaster Risk Management (DRM) Training on 1&#8211;2 December 2023, further strengthening community resilience and preparedness among Rohingya refugees. The workshop combined classroom instruction with group discussions, scenario-based exercises, practical drills, participant presentations, and feedback sessions, focused on disaster prevention, emergency preparedness, response, and recovery.' },
      { heading: 'Workshop Highlights', type: 'list', content: [
        'Fundamental concepts and terminology of Disaster Risk Management',
        'Identifying and assessing disaster risks specific to the camps',
        'The phases of DRM &#8212; prevention, preparedness, response, recovery, and mitigation',
        'Developing disaster preparedness and emergency response plans',
        'Strategies for reducing disaster risks and their impact',
        'Emergency response coordination and communication',
        'Physical and Basic Psychological First Aid techniques',
        'Analysis of real-life disaster scenarios'
      ]},
      { heading: 'Acknowledgement', type: 'prose', content: 'RSU sincerely thanks all participants for their enthusiasm and active involvement, and appreciates the trainers whose expertise ensured the successful delivery of this intensive program. The fourth DRM Training was implemented by Team KTP-01E, whose commitment to community service played an important role in advancing disaster preparedness within the camps.' }
    ]
  },
  {
    tag: 'Disaster Preparedness &#183; Women &amp; Girls',
    title: 'DRM Training for Rohingya Women and Girls',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgG2jaJUN4R1B2pcBshrqZPWnL0H9xZ5UrAwkA8x2fzppuiolXKc8u7bS79w7T6RDcEMdKGIFycQV59y2jIkiMYLwcKrNJF6G4S87R0uNsKtzu9aVa6Bp4k3bLxk9y8MhAedpuEsJ-XP-M1Ws4j8IVrIJjP2_jUagVoIgdk1Z9VG0DiNOIeWS59wSMPbT4/s2048/482216826_948012507514823_5207696665213387018_n.jpg',
    meta: [
      { label: 'Training Title', val: 'DRM Training for Rohingya Women and Girls' },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' },
      { label: 'Implemented by', val: 'Team Balukhali' },
      { label: 'Focus', val: 'Women &amp; Girls&#39; Leadership in Disaster Preparedness' }
    ],
    sections: [
      { heading: 'Overview', type: 'prose', content: 'RSU successfully conducted a two-day Disaster Risk Management (DRM) Training dedicated to Rohingya women and girls, reaffirming its commitment to inclusive community development and disaster resilience. As primary caregivers and often the first responders within their households, women and girls play a vital role in reducing disaster risk and protecting families &#8212; this training equipped them with practical skills, life-saving knowledge, and the confidence to lead during emergencies.' },
      { heading: 'Training Topics', type: 'list', content: [
        'Fundamentals and key concepts of Disaster Risk Management',
        'Understanding the disaster risk profile of the refugee camps',
        'Household and community-level disaster preparedness planning',
        'Disaster risk reduction, prevention, and mitigation strategies',
        'Public awareness and community engagement for preparedness',
        'Hazard identification, early warning systems, and emergency communication',
        'Basic Medical and Psychological First Aid',
        'Analysis of real-life disaster case studies'
      ]},
      { heading: 'Acknowledgement', type: 'prose', content: 'RSU extends its sincere appreciation to every participant for their enthusiasm and active engagement, and acknowledges the dedication of its trainers in creating a supportive, empowering learning environment. Implemented by Team Balukhali, this training reflects RSU&#39;s vision of building resilient, inclusive communities where women and girls are empowered as leaders in disaster preparedness.' }
    ]
  },
  {
    tag: 'Disaster Preparedness &#183; Batch 5',
    title: 'Disaster Risk Management Training',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9JCScm3iqL_qvarbhAwviUchShdcuKChGD_MMXAW_VIoJqe9AS1wZ1luYZOwexbVWYVjWNVM_C0Hzo-d2ctLTXKBTy6qYA8CFcsxvx74VwCichWpQpBUp4ZQUq7jUl3xLDx1hukrA4AracBktQlKaj_mPsbXz2-_ZBPKKr3hnIfLOmS8ctYMe-5WmDZE/s2048/482345904_949143654068375_1750521253115406580_n.jpg',
    meta: [
      { label: 'Training Title', val: 'Disaster Risk Management Training &#8212; Batch 5' },
      { label: 'Date', val: '9&#8211;10 December 2023' },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' }
    ],
    sections: [
      { heading: 'Overview', type: 'prose', content: 'RSU successfully concluded the fifth batch of its two-day Disaster Risk Management (DRM) Training on 9&#8211;10 December 2023, continuing its commitment to strengthening disaster preparedness and building resilient communities across the Rohingya refugee camps. The workshop provided both theoretical understanding and practical experience through an engaging, action-oriented learning environment facilitated by experienced trainers.' },
      { heading: 'Training Highlights', type: 'list', content: [
        'Interactive lectures on Disaster Risk Management principles',
        'Hands-on practical exercises to reinforce learning',
        'Emergency response drills and disaster preparedness simulations',
        'Group presentations and collaborative learning activities',
        'Constructive feedback sessions to strengthen skills and confidence'
      ]},
      { heading: 'Acknowledgement', type: 'prose', content: 'RSU extends its sincere gratitude to every participant whose enthusiasm and commitment made the training a success, and to the dedicated trainers whose expertise ensured an engaging and impactful learning experience. The successful completion of this fifth DRM Training marks another milestone in RSU&#39;s ongoing mission to empower the Rohingya community with life-saving knowledge and practical skills.' }
    ]

  },
  {
    tag: 'Education Project',
    title: 'Final-Term Teacher Development Workshop',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAGLZGFVByccpExAcJcnDReU_P9YqsWuLHGHEG5P5jcp9u-r3LU4FW6S-geYFVIFQ8iCuZl59tn8teuFPcSaWOl7RtY1GpwxTjBAnhDjfRYfCBFy4UqjIX83TvfYoY35-6BtPJ0ZTYt96pvFlctY1I-qxFHEUHtaTNF8-v5ddBhz9G9BR9vRdafGEr-jI/s2048/758964303_1342166541432749_7409638839888242136_n.jpg',
    meta: [
      { label: 'Program', val: 'Literacy for Rohingya Girls' },
      { label: 'Workshop', val: 'Final-Term Teacher Development Workshop' },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' }
    ],
    sections: [
      {
        heading: 'Overview',
        type: 'prose',
        content: 'The Final-Term Teacher Development Workshop for the Literacy for Rohingya Girls program brought educators together to reflect on their teaching journeys, celebrate progress, and prepare to make learning more effective for Rohingya girls.'
      },
      {
        heading: 'Workshop Highlights',
        type: 'list',
        content: [
          'Reviewed students’ mid-term progress',
          'Identified learning gaps and shared classroom experiences',
          'Developed practical strategies to strengthen reading and writing',
          'Explored ways to improve speaking, listening, and mathematics instruction'
        ]
      },
      {
        heading: 'Moving Forward',
        type: 'prose',
        content: 'Together, the teachers renewed their commitment to helping every child receive quality education and achieve the program’s learning goals.' }
    ]
  },
    {
    tag: 'Education Support Program',
    title: 'Bridging the Gap in Education for Every Child',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMDfv9pVzALHGS_oN1VLNMzMK7bnNud-dPW_3QoOjUrGbQ5D2bA_C2yu3oisojxrY_NLITGJuWX9OSfp4cD8qEyR02iomIniMJk3VJmB5sBPvEJ7SgZ8ci99GGI09JCIjH8MduA_-WbiY0h5I2CJLVnYXTEy7pJ3dqoETLXqUP19Kp6S1pySsoknjj9L0/s320/Bridging%20the%20Gap%20in%20Education.png',
    meta: [
      { label: 'Program', val: 'Education Support Program' },
      { label: 'Location', val: "Cox's Bazar Camps, Bangladesh" },
      { label: 'Organized by', val: 'Rohingya Student Union (RSU)' }
    ],
    sections: [
      {
        heading: 'Overview',
        type: 'prose',
        content: "The Rohingya Student Union (RSU) implemented a six-month Education Support Program in Rohingya refugee camps in Cox’s Bazar, Bangladesh, to expand access to quality education for children who face barriers to learning, particularly girls. Through community-based learning centers, local teacher recruitment, educational materials, and community engagement, the program worked to create safe, inclusive, and supportive learning opportunities for Rohingya children.

Key Achievements"
      },
      {
        heading: 'Program Highlights',
        type: 'list',
        content: [
          'Supported 90 Rohingya children through six community-based learning centers',
          "Achieved 68% girls' enrollment",
          "6 local teachers recruited, including four women."
          '99% average attendance recorded across the learning centers.',
          'Provided learning materials to support children’s education',
          '97% of students reported to have developed the ability to read and write simple sentences in Burmese and English by the end of the project.'
          '400–500 community members estimated to have benefited indirectly through awareness, engagement, and improved community support for education.'
          'Strengthened teaching through teacher training',
          'Promoted safer and more inclusive learning environments'
        ]
      },
      {
        heading: 'Creating Opportunities Through Education',
        type: 'prose',
        content: "The program established learning centers in five target camps to bring educational opportunities closer to children and their families. Students received essential learning materials, including school bags, textbooks, exercise books, stationery, and other classroom supplies. Refreshments were provided on class days to encourage participation and regular attendance. \n\n RSU also recruited and trained local teachers, with a strong emphasis on female educators, child safeguarding, inclusive teaching practices, and gender-responsive education. Regular monitoring visits and engagement with parents and community leaders helped strengthen trust and maintain learning quality."
      },
      {
        heading: 'Empowering Girls and Strengthening Communities',
        type: 'prose',
        content: "Girls’ education remained at the heart of the initiative. By establishing accessible learning spaces and recruiting female teachers, RSU helped address some of the safety, distance, and social barriers that prevent Rohingya girls from accessing education.  \n\n  Community discussions, parent meetings, and engagement with Majhis, Imams, and other community members helped promote greater acceptance of girls’ education and encouraged families to support their children’s learning."
      },
      {
        heading: 'Transforming Young Lives',
        type: 'prose',
        content: "Behind every achievement is a child with renewed confidence and hope. During the program, students who previously had limited access to education developed foundational reading, writing, and mathematics skills. Some began helping younger siblings with their schoolwork, while others expressed ambitions of becoming teachers, nurses, doctors, and humanitarian workers.\n\n Their journeys demonstrate how accessible, community-led education can help children recognize their potential and imagine a brighter future.
      },
      {
        heading: 'Impact',
        type: 'prose',
        content: "The six-month program helped strengthen educational access for Rohingya children, with a focus on participation, attendance, and supportive community-based learning environments."
      }
    ]
  },
];
function escAttr(s) {

  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
function renderProgModal(idx) {
  var d = progData[idx];
  window._openProgIdx = idx;
  var loc = d;
  var backLabel = 'Back to Advocacy';

  var html = '';

  /* Top bar */
  html += '<div class="pp-topbar">'
    + '<button class="pp-back" onclick="closeProgModal()">'
    + '<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" width="18"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
    + backLabel
    + '</button>'
    + '<span class="pp-topbar-tag">' + loc.tag + '</span>'
    + '<div class="pp-progress-track"><div class="pp-progress-bar" id="ppProgressBar"></div></div>'
    + '</div>';

  /* Hero */
  html += '<div class="pp-hero">'
    + '<img src="' + d.img + '" alt="' + escAttr(loc.title) + '"/>'
    + '<div class="pp-hero-overlay"></div>'
    + '<div class="pp-hero-content">'
    + '<span class="pp-hero-tag">' + loc.tag + '</span>'
    + '<h1 class="pp-hero-title" id="ppTitle">' + loc.title + '</h1>'
    + '</div>'
    + '</div>';

  /* Content */
  html += '<div class="pp-content">';

  /* Meta grid */
  html += '<div class="pp-meta">';
  loc.meta.forEach(function(m) {
    html += '<div class="pp-meta-item">'
      + '<span class="pp-meta-label">' + m.label + '</span>'
      + '<span class="pp-meta-val">' + m.val + '</span>'
      + '</div>';
  });
  html += '</div>';

  /* Sections */
  loc.sections.forEach(function(s) {
    html += '<div class="pp-section">'
      + '<h2 class="pp-section-head"><span class="pp-section-head-bar"></span>' + s.heading + '</h2>';
    if (s.type === 'prose') {
      html += '<p class="pp-prose">' + s.content + '</p>';
    } else {
      html += '<ul class="pp-list">';
      s.content.forEach(function(item) { html += '<li>' + item + '</li>'; });
      html += '</ul>';
    }
    html += '</div>';
  });

  html += '</div>';

  var page = document.getElementById('progPage');
  document.getElementById('progPageInner').innerHTML = html;
  page.scrollTop = 0;
  page.classList.add('open');
  updateProgProgress();
}

/* Reading-progress bar for the open training report: fills as the
   user scrolls through the modal's content. Reset to 0 on open/close
   so it never carries over between reports. */
function updateProgProgress() {
  var page = document.getElementById('progPage');
  var bar = document.getElementById('ppProgressBar');
  if (!page || !bar) return;
  var scrollable = page.scrollHeight - page.clientHeight;
  var pct = scrollable > 0 ? (page.scrollTop / scrollable) * 100 : 0;
  bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
}
var progPageEl = document.getElementById('progPage');     /* only present on the Advocacy page */
if (progPageEl) progPageEl.addEventListener('scroll', function() {
  if (this.classList.contains('open')) updateProgProgress();
}, { passive: true });

function hideProgModal() {
  var pp = document.getElementById('progPage');
  if (pp) pp.classList.remove('open');
}
/* Safety check for report cards listed in the Advocacy data files ({ report: N }): progData is defined just
   above, so this is the first place that can confirm N exists. A card for a missing report is removed. */
(function () {
  Array.prototype.slice.call(document.querySelectorAll('.programs-full-grid > .prog-card[onclick^="openProgModal("]')).forEach(function (c) {
    var n = parseInt(c.getAttribute('onclick').replace(/\D/g, ''), 10);
    if (!progData[n]) {
      if (window.console) console.warn('A card for report ' + n + ' was removed: there is no report ' + n + ' in progData (assets/site.js).');
      c.parentNode.removeChild(c);
    }
  });
})();

/* Latest Update (home): shows the first 3 entries of progData, the same
   list that feeds the Advocacy page. It shows the first three entries.
   (New reports are added at the END of progData so existing report numbers never change; see the NOTE above progData.) */
(function() {
  var grid = document.getElementById('latestGrid');
  if (!grid || typeof progData === 'undefined') return;
  var COUNT = 3;
  var HIDE_TITLES = [];   /* titles not shown in this section */
  var ARROW = '<svg fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" width="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function excerpt(d, max) {
    var txt = '';
    for (var i = 0; i < (d.sections || []).length; i++) {
      if (d.sections[i].type === 'prose') { txt = d.sections[i].content; break; }
    }
    if (txt.length <= max) return txt;
    var cut = txt.slice(0, max);
    return cut.slice(0, Math.max(cut.lastIndexOf(' '), 60)).replace(/[\s,.;:\u2014-]+$/, '') + '\u2026';
  }
  function dateOf(d) {
    for (var i = 0; i < (d.meta || []).length; i++) {
      if (d.meta[i].label === 'Date') return d.meta[i].val;
    }
    return '';
  }
  progData.slice(0, COUNT).forEach(function(d, i) {
    var feature = (i === 0);
    var a = el('a', 'latest-card' + (feature ? ' latest-card--feature' : ''));
    a.href = '/advocacy/#report-' + i;      /* opens that report's overlay on the Advocacy page */

    var imgBox = el('div', 'latest-img');
    var img = document.createElement('img');
    img.src = d.img; img.alt = d.title; img.loading = 'lazy';
    imgBox.appendChild(img);
    if (feature) imgBox.appendChild(el('span', 'latest-badge', 'Newest'));
    a.appendChild(imgBox);

    var body = el('div', 'latest-body');
    if (HIDE_TITLES.indexOf(d.title) === -1) body.appendChild(el('h3', 'latest-title', d.title));
    body.appendChild(el('p', 'body-sm latest-excerpt', excerpt(d, feature ? 190 : 110)));
    var foot = el('div', 'latest-foot');
    var dt = dateOf(d);
    if (dt) foot.appendChild(el('span', 'latest-date', dt));
    var more = el('span', 'latest-more');
    more.appendChild(el('span', '', 'Read Full Report'));
    more.insertAdjacentHTML('beforeend', ARROW);
    foot.appendChild(more);
    body.appendChild(foot);
    a.appendChild(body);
    grid.appendChild(a);
  });
})();

function openProgModal(idx) {                 /* card onclick="openProgModal(0)" */
  location.hash = '#report-' + idx;
}
function closeProgModal() {                   /* Back button and Escape both use this */
  if (/^#report-\d+/.test(location.hash)) {
    if (window._routeChanges > 0) history.back();      /* opened from the list: go back to it */
    else {                                             /* opened from a shared link: stay on the page */
      history.replaceState(null, '', location.pathname + location.search);
      routeReport();
    }
  } else {
    hideProgModal();
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeProgModal();
});
/* Donate page: copy the donation email to the clipboard */
function copyDonateEmail(btn) {
  var text = 'rsu.incamp@gmail.com';
  var done = function() {
    var label = btn.querySelector('span');
    btn.classList.add('is-copied');
    if (label) label.textContent = 'Copied';
    setTimeout(function() {
      btn.classList.remove('is-copied');
      if (label) label.textContent = 'Copy';
    }, 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, function() {});
  } else {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(ta);
  }
}

/* ── Report overlay router (Advocacy page): /advocacy/#report-3 opens report 3 ──
   Each section is now its own page (/about/, /team/ ...), so the only hash left is the report overlay.
   Old addresses such as /#/advocacy/3 are forwarded by a small script on the home page. */
var PAGE_TITLE = document.title;              /* the page's own title, restored when a report closes */

function routeReport() {
  if (!document.getElementById('progPage')) return;
  var m = /^#report-(\d+)$/.exec(location.hash);
  var idx = m ? parseInt(m[1], 10) : -1;
  var hasReport = idx >= 0 && !!progData[idx];
  if (m && !hasReport) history.replaceState(null, '', location.pathname + location.search);   /* tidy an unknown report address */
  if (hasReport) renderProgModal(idx); else hideProgModal();
  document.title = hasReport ? progData[idx].title + ' \u2014 RSU' : PAGE_TITLE;
}

if (document.getElementById('progPage')) {
  window.addEventListener('hashchange', function () {
    window._routeChanges = (window._routeChanges || 0) + 1;
    routeReport();
  });
  routeReport();   /* deep links such as /advocacy/#report-3 */
}

/* ── Post pages: first photo becomes the hero image; reading-progress bar ── */
(function () {
  var art = document.querySelector('.post-article');
  if (!art) return;

  var hero = document.getElementById('postHero');
  var body = art.querySelector('.post-body');
  var img = body ? body.querySelector('img') : null;
  if (hero && img) {
    var link = img.closest('a');
    var big = (link && /googleusercontent|blogspot|bp\.blogspot/.test(link.href) && /\.(jpe?g|png|webp|gif)/i.test(link.href))
      ? link.href
      : img.src.replace(/\/(?:s\d+|w\d+-h\d+(?:-c)?)\//, '/s1600/');
    var hi = document.createElement('img');
    hi.src = big;
    hi.alt = img.alt || (document.querySelector('.pp-hero-title') || {}).textContent || '';
    hero.insertBefore(hi, hero.firstChild);
    hero.classList.remove('pp-hero--noimg');
    /* remove the photo from the body so it doesn't show twice */
    var sep = img.closest('.separator');
    var holder = (sep && sep.querySelectorAll('img').length === 1) ? sep : (link || img);
    if (holder.parentNode) holder.parentNode.removeChild(holder);
  }

  /* Make the top bar start at the very top of the window, whatever Blogger (navbar, wrappers)
     puts above the post in the page flow. */
  var view = document.querySelector('.post-view');
  function pullToTop() {
    if (!view) return;
    view.style.marginTop = '0px';
    var top = art.getBoundingClientRect().top + window.pageYOffset;
    if (top > 0.5) view.style.marginTop = (-top) + 'px';
  }
  pullToTop();
  window.addEventListener('load', pullToTop);
  window.addEventListener('resize', pullToTop);
  setTimeout(pullToTop, 700);
  setTimeout(pullToTop, 2500);

  var bar = document.getElementById('postProgress');
  if (bar) {
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
/* Footer copyright year */
(function () {
  var y = document.getElementById('copyYear');
  if (y) y.textContent = new Date().getFullYear();
})();
/* About dropdown: close it after a choice (it reopens on the next hover / focus) */
(function () {
  var li = document.querySelector('.nav-links li.has-sub');
  if (!li) return;
  li.querySelectorAll('a, button').forEach(function (b) {
    b.addEventListener('click', function () {
      li.classList.add('menu-closed');
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    });
  });
  li.addEventListener('mouseleave', function () { li.classList.remove('menu-closed'); });
  li.addEventListener('focusin', function () { li.classList.remove('menu-closed'); });
})();
/* ── Accessibility: dialog focus handling, gallery keyboard access (audit pass) ──
   Additive only: it watches the existing 'open' classes, so the existing open/close code paths are unchanged. */
(function () {
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var drawer = document.getElementById('mobileDrawer');
  var lightbox = document.getElementById('lightbox');
  var progPage = document.getElementById('progPage');
  var trigger = document.getElementById('mobileTrigger');

  function focusEl(el) {
    if (!el) return;
    try { el.focus({ preventScroll: true }); } catch (err) { el.focus(); }
  }

  /* When the dialog opens: remember the opener and move focus in. When it closes: put focus back
     on the opener, unless focus has already been moved somewhere else (for example to a new view's heading). */
  function watch(el, opts) {
    if (!el || !window.MutationObserver) return;
    var wasOpen = el.classList.contains('open');
    var opener = null;
    new MutationObserver(function () {
      var isOpen = el.classList.contains('open');
      if (isOpen === wasOpen) return;
      wasOpen = isOpen;
      if (isOpen) {
        opener = document.activeElement;
        if (opts.onOpen) opts.onOpen();
        focusEl(el.querySelector(opts.first));
      } else {
        var ae = document.activeElement;
        var focusWasHere = !ae || ae === document.body || el.contains(ae);
        if (opts.onClose) opts.onClose();
        if (focusWasHere) {
          var back = (opener && opener !== document.body && document.contains(opener)) ? opener : opts.fallback;
          focusEl(back);
        }
      }
    }).observe(el, { attributes: true, attributeFilter: ['class'] });
    /* a dialog that is already open when this runs (a shared /advocacy/#report-3 link): move focus into it */
    if (wasOpen) {
      if (opts.onOpen) opts.onOpen();
      var first = el.querySelector(opts.first);
      if (first) {
        try { first.focus({ preventScroll: true, focusVisible: false }); }   /* no focus ring on page load */
        catch (err) { first.focus(); }
      }
    }
  }

  watch(drawer, {
    first: '.mobile-close',
    fallback: trigger,
    onOpen: function () { drawer.removeAttribute('inert'); if (trigger) trigger.setAttribute('aria-expanded', 'true'); },
    onClose: function () { drawer.setAttribute('inert', ''); if (trigger) trigger.setAttribute('aria-expanded', 'false'); }
  });
  watch(lightbox, {
    first: '.lightbox-close',
    onOpen: function () { lightbox.removeAttribute('inert'); },
    onClose: function () { lightbox.setAttribute('inert', ''); }
  });
  watch(progPage, { first: '.pp-back' });

  /* Keep Tab inside whichever dialog is open */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var box = [progPage, lightbox, drawer].filter(function (el) { return el && el.classList.contains('open'); })[0];
    if (!box) return;
    var items = Array.prototype.filter.call(box.querySelectorAll(FOCUSABLE), function (n) { return n.getClientRects().length > 0; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1], ae = document.activeElement;
    if (!box.contains(ae)) { e.preventDefault(); focusEl(first); }
    else if (e.shiftKey && ae === first) { e.preventDefault(); focusEl(last); }
    else if (!e.shiftKey && ae === last) { e.preventDefault(); focusEl(first); }
  });

  /* Escape closes the mobile menu */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) toggleMobileMenu();
  });

  /* Gallery photos: reachable and operable from the keyboard (Enter / Space) */
  var grid = document.getElementById('galleryGrid');
  if (grid) {
    var photos = grid.querySelectorAll('.gallery-item');
    photos.forEach(function (el, i) {
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      var m = /openLightbox\((\d+)\)/.exec(el.getAttribute('onclick') || '');
      var num = m ? parseInt(m[1], 10) + 1 : i + 1;   /* same numbering the lightbox uses */
      var total = (typeof galleryImages !== 'undefined' && galleryImages.length) ? galleryImages.length : photos.length;
      el.setAttribute('aria-label', 'Open photo ' + num + ' of ' + total);
    });
    grid.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('gallery-item')) {
        e.preventDefault();
        e.target.click();
      }
    });
  }
})();
