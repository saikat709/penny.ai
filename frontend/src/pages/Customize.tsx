import CustomizeFlow from '../components/Customize/CustomizeFlow';

export default function Customize() {
  return (
    <div className="h-full min-h-[90vh] bg-gradient-to-b from-white to-gray-50 dark:from-dark-300 dark:to-dark-400 py-12">
      <div className="container-custom">
        <CustomizeFlow />
      </div>
    </div>
  );
}
