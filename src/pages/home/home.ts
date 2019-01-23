import { Component } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public tagID = ''

	constructor(public loadingCtrl: LoadingController, private nfc: NFC, public platform: Platform) {
		let loading = this.loadingCtrl.create({
		    spinner: 'ios'
		});
		loading.present();
		this.platform.ready().then(() => {
			this.activateListener();
			if (loading.instance) {loading.dismiss();}
		}); //this.platform.ready()
	}

	activateListener() {
		if (this.platform.is('cordova')) {
			this.nfc.addTagDiscoveredListener(() => {
				console.log('Successfully attached Tag Listener');
			}, (err) => {
				console.log('Error attaching Tag Listener', err);
			}).subscribe((event) => {
				console.log('Decoded TagID:', this.nfc.bytesToHexString(event.tag.id));
				this.tagID = this.nfc.bytesToHexString(event.tag.id);
				alert(this.tagID)
			}); //this.nfc.addTagDiscoveredListener()
		} //if (this.platform.is('cordova'))
	}

}
