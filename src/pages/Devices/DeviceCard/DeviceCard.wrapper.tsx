/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import useStore from '../../../store/useStore';
import DeviceCard from './DeviceCard';

const DeviceCardWrapper = ({
  virtual,
  index,
}: {
  virtual: any;
  index: number;
}) => {
  const getVirtuals = useStore((state) => state.getVirtuals);
  const getDevices = useStore((state) => state.getDevices);
  const virtuals = useStore((state) => state.virtuals);
  const devices = useStore((state) => state.devices);
  const deleteVirtual = useStore((state) => state.deleteVirtual);
  const setDialogOpenAddDevice = useStore(
    (state) => state.setDialogOpenAddDevice
  );
  const setDialogOpenAddVirtual = useStore(
    (state) => state.setDialogOpenAddVirtual
  );
  const graphs = useStore((state) => state.graphs);
  const graphsMulti = useStore((state) => state.graphsMulti);
  const clearVirtualEffect = useStore((state) => state.clearVirtualEffect);
  const updateVirtual = useStore((state) => state.updateVirtual);
  const activateDevice = useStore((state) => state.activateDevice);

  const [_fade, setFade] = useState(false);
  const [_isActive, setIsActive] = useState(
    (virtuals &&
      virtual &&
      virtuals[virtual] &&
      virtuals[virtual].effect &&
      Object.keys(virtuals[virtual].effect)?.length > 0) ||
      (devices &&
        devices[Object.keys(devices).find((d) => d === virtual) || '']
          ?.active_virtuals?.length > 0)
  );

  const handleDeleteDevice = () => {
    deleteVirtual(virtuals[virtual]?.id).then(() => {
      getVirtuals();
    });
  };

  const handleEditVirtual = () => {
    setDialogOpenAddVirtual(true, virtual);
  };
  const handleEditDevice = (device: any) => {
    setDialogOpenAddDevice(true, device);
  };

  const handleClearEffect = () => {
    clearVirtualEffect(virtual).then(() => {
      setFade(true);
      setTimeout(() => {
        getVirtuals();
        getDevices();
      }, virtuals[virtual].config.transition_time * 1000);
      setTimeout(() => {
        setFade(false);
      }, virtuals[virtual].config.transition_time * 1000 + 300);
    });
  };

  const handlePlayPause = () => {
    updateVirtual(virtuals[virtual].id, !virtuals[virtual].active).then(() =>
      getVirtuals()
    );
  };

  const handleActivateDevice = (e: any) => {
    activateDevice(e).then(() => getDevices());
  };

  useEffect(() => {
    setIsActive(
      (virtual &&
        virtuals[virtual] &&
        Object.keys(virtuals[virtual]?.effect)?.length > 0) ||
        devices[Object.keys(devices).find((d) => d === virtual) || '']
          ?.active_virtuals?.length > 0
    );
  }, [virtuals, devices]);

  return virtual && virtuals[virtual] ? (
    <DeviceCard
      deviceName={
        virtual && virtuals[virtual]?.config && virtuals[virtual]?.config.name
      }
      online={
        devices[Object.keys(devices).find((d) => d === virtual) || '']?.online
      }
      virtId={virtual}
      index={index}
      handleDeleteDevice={() => handleDeleteDevice()}
      handleEditVirtual={() => handleEditVirtual()}
      handleEditDevice={() => handleEditDevice(virtuals[virtual]?.is_device)}
      handleClearEffect={() => handleClearEffect()}
      handlePlayPause={() => handlePlayPause()}
      linkTo={`/device/${virtuals[virtual]?.id}`}
      iconName={
        virtuals[virtual]?.config &&
        virtuals[virtual]?.config.icon_name &&
        virtuals[virtual]?.config.icon_name
      }
      effectName={virtuals[virtual]?.effect.name}
      graphsActive={graphs && graphsMulti}
      graphsMulti={graphsMulti}
      isDevice={virtuals[virtual]?.is_device}
      activateDevice={handleActivateDevice}
      colorIndicator={false}
      isPlaying={virtuals[virtual]?.active}
      transitionTime={virtuals[virtual].config.transition_time * 1000}
      isStreaming={
        devices[Object.keys(devices).find((d) => d === virtual) || '']
          ?.active_virtuals?.length > 0
      }
      previewOnly={
        virtual &&
        virtuals[virtual]?.config &&
        virtuals[virtual]?.config.preview_only
      }
      isEffectSet={Object.keys(virtuals[virtual]?.effect)?.length > 0}
      additionalStyle={{
        order: !(
          devices[Object.keys(devices).find((d) => d === virtual) || '']
            ?.active_virtuals?.length > 0 || virtuals[virtual]?.effect.name
        )
          ? 100
          : !virtuals[virtual]?.effect.name
          ? 50
          : 'unset',
      }}
    />
  ) : null;
};

export default DeviceCardWrapper;
