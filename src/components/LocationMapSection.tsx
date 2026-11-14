import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin } from 'lucide-react';
import { CONFIGURABLE_LOCATION_PRESETS, OFFICIAL_CONTACT } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

interface ActivePinState {
  label: string;
  address: string;
  lat: number;
  lng: number;
}

function InteractiveMapCanvas({ pin }: { pin: ActivePinState }) {
  const loadingStatus = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const { lang, t } = useLanguage();

  if (
    loadingStatus === APILoadingStatus.FAILED ||
    loadingStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return <MapFallbackCard pin={pin} openLabel={t.contact.openInMaps} lang={lang} />;
  }

  return (
    <div className="w-full h-[380px] rounded-lg overflow-hidden border border-slate-200 relative">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        center={{ lat: pin.lat, lng: pin.lng }}
        defaultZoom={11}
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={{ lat: pin.lat, lng: pin.lng }}
          title={pin.label}
          onClick={() => setInfoOpen(true)}
        >
          <Pin background="#c81e1e" borderColor="#0b1f3a" glyphColor="#ffffff" />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow anchor={marker} maxWidth={260} onCloseClick={() => setInfoOpen(false)}>
            <div className="p-1 space-y-1 text-slate-900">
              <p className="font-display font-bold text-xs text-navy-900">{pin.label}</p>
              <p className="text-xs text-slate-600">{pin.address}</p>
              <p className="text-xs font-medium text-crimson-700 tabular-nums">
                {OFFICIAL_CONTACT.phoneDisplay}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

function MapFallbackCard({
  pin,
  openLabel,
  lang,
}: {
  pin: ActivePinState;
  openLabel: string;
  lang: 'en' | 'es';
}) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${pin.lat},${pin.lng}`
  )}`;

  return (
    <div className="w-full h-[380px] rounded-lg border border-slate-200 bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-white p-6 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200">
          <MapPin className="w-4 h-4 text-red-400" aria-hidden="true" />
          <span>{lang === 'es' ? 'Ubicación Configurada' : 'Configured Service Location'}</span>
        </div>
        <h4 className="font-display font-bold text-lg text-white">{pin.label}</h4>
        <p className="text-sm text-slate-300">{pin.address}</p>
        <p className="text-xs font-mono text-slate-300 tabular-nums">
          {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
        <span className="text-xs text-slate-300">
          {OFFICIAL_CONTACT.companyName} · {OFFICIAL_CONTACT.phoneDisplay}
        </span>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-navy-900 hover:bg-slate-100 rounded-md transition-colors"
        >
          <span>{openLabel}</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function LocationMapSection() {
  const { lang, t, siteLocation } = useLanguage();
  const c = t.contact;

  const [selectedPresetId, setSelectedPresetId] = useState<string>('default');
  const [activePin, setActivePin] = useState<ActivePinState>({
    label: siteLocation.name,
    address: siteLocation.address,
    lat: siteLocation.lat,
    lng: siteLocation.lng,
  });

  const [customLabel, setCustomLabel] = useState(siteLocation.name);
  const [customLat, setCustomLat] = useState(String(siteLocation.lat));
  const [customLng, setCustomLng] = useState(String(siteLocation.lng));

  useEffect(() => {
    if (selectedPresetId === 'default') {
      setActivePin({
        label: siteLocation.name,
        address: siteLocation.address,
        lat: siteLocation.lat,
        lng: siteLocation.lng,
      });
      setCustomLabel(siteLocation.name);
      setCustomLat(String(siteLocation.lat));
      setCustomLng(String(siteLocation.lng));
    }
  }, [siteLocation, selectedPresetId]);

  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = CONFIGURABLE_LOCATION_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const label = lang === 'es' ? preset.labelEs : preset.labelEn;
    setActivePin({
      label,
      address: preset.address,
      lat: preset.lat,
      lng: preset.lng,
    });
    setCustomLabel(label);
    setCustomLat(String(preset.lat));
    setCustomLng(String(preset.lng));
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedLat = Number.parseFloat(customLat);
    const parsedLng = Number.parseFloat(customLng);
    if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLng)) return;
    if (parsedLat < -90 || parsedLat > 90 || parsedLng < -180 || parsedLng > 180) return;

    setSelectedPresetId('custom');
    setActivePin({
      label: customLabel.trim() || siteLocation.name,
      address: `${parsedLat.toFixed(4)}, ${parsedLng.toFixed(4)}`,
      lat: parsedLat,
      lng: parsedLng,
    });
  };

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-xl text-navy-900">{c.mapTitle}</h3>
          <p className="text-sm text-slate-600 mt-1">{c.mapSubtitle}</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${activePin.lat},${activePin.lng}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-navy-900 whitespace-nowrap shrink-0"
        >
          <span>{c.openInMaps}</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Configurable Location Corridor Presets */}
      <div className="flex flex-wrap items-center gap-2">
        {CONFIGURABLE_LOCATION_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handlePresetSelect(preset.id)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
              selectedPresetId === preset.id
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {lang === 'es' ? preset.labelEs : preset.labelEn}
          </button>
        ))}
      </div>

      {mapsApiKey ? (
        <APIProvider
          apiKey={mapsApiKey}
          libraries={['marker']}
          language={lang}
          region="US"
        >
          <InteractiveMapCanvas pin={activePin} />
        </APIProvider>
      ) : (
        <MapFallbackCard pin={activePin} openLabel={c.openInMaps} lang={lang} />
      )}

      {/* Configurable Coordinate Controls */}
      <form
        onSubmit={handleApplyCustom}
        className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 items-end"
      >
        <div className="sm:col-span-2">
          <label htmlFor="map-custom-label" className="block text-xs font-semibold text-slate-700 mb-1">
            {c.customLabel}
          </label>
          <input
            id="map-custom-label"
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          />
        </div>
        <div>
          <label htmlFor="map-custom-lat" className="block text-xs font-semibold text-slate-700 mb-1">
            {c.customLat}
          </label>
          <input
            id="map-custom-lat"
            type="number"
            step="any"
            value={customLat}
            onChange={(e) => setCustomLat(e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono tabular-nums border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
          />
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label htmlFor="map-custom-lng" className="block text-xs font-semibold text-slate-700 mb-1">
              {c.customLng}
            </label>
            <input
              id="map-custom-lng"
              type="number"
              step="any"
              value={customLng}
              onChange={(e) => setCustomLng(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono tabular-nums border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-800"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
          >
            {c.applyLocation}
          </button>
        </div>
      </form>
    </div>
  );
}
