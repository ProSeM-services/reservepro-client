import React from "react";
import { format, addDays, parseISO, isWithinInterval } from "date-fns";
import { es } from "date-fns/locale";
import { IAppointment } from "@/interfaces/appointments.interface";
import { DateRange } from "react-day-picker";

interface WeeklyCalendarProps {
  appointments: IAppointment[];
  dateRange: DateRange;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  appointments,
  dateRange,
}) => {
  const { from, to } = dateRange;

  if (!from || !to) {
    return (
      <div className="text-center text-gray-500 p-4">
        Por favor, selecciona un rango válido de fechas.
      </div>
    );
  }

  // Genera los días dentro del rango `from` y `to`
  const daysInRange: Date[] = [];
  let currentDate = from;
  while (currentDate <= to) {
    daysInRange.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  // Horarios (por ejemplo, de 6:00 a 21:00)
  const hours = Array.from({ length: 16 }, (_, i) => i + 6);

  // Filtrar y organizar turnos dentro del rango de fechas
  const appointmentsByDay: Record<string, IAppointment[]> = appointments.reduce(
    (acc, appointment) => {
      const appointmentDate = parseISO(appointment.date);
      if (
        isWithinInterval(appointmentDate, {
          start: from,
          end: to,
        })
      ) {
        const dayKey = format(appointmentDate, "yyyy-MM-dd");
        if (!acc[dayKey]) acc[dayKey] = [];
        acc[dayKey].push(appointment);
      }
      return acc;
    },
    {} as Record<string, IAppointment[]>
  );

  return (
    <div
      className="grid border border-gray-300 rounded-lg shadow-md"
      style={{
        gridTemplateColumns: `60px repeat(${Math.min(
          daysInRange.length,
          8
        )}, minmax(120px, 1fr))`,
      }}
    >
      {/* Encabezados de días */}
      <div className="bg-gray-100 text-sm text-gray-600 font-semibold"></div>
      {daysInRange.map((day) => (
        <div
          key={day.toISOString()}
          className="text-center p-2 bg-gray-100 text-sm text-gray-700 font-semibold border-l"
        >
          <div>{format(day, "EEEE", { locale: es })}</div>
          <div>{format(day, "dd/MM", { locale: es })}</div>
        </div>
      ))}

      {/* Filas de horarios */}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          {/* Columna de horas */}
          <div className="p-2 text-right text-xs text-gray-500 bg-gray-50 border-t border-gray-300">
            {`${hour}:00`}
          </div>
          {/* Celdas de turnos */}
          {daysInRange.map((day) => {
            const dayKey = format(day, "yyyy-MM-dd");
            const dayAppointments = appointmentsByDay[dayKey] || [];
            const hourAppointments = dayAppointments.filter(
              (appointment) =>
                parseISO(
                  `${appointment.date}T${appointment.time}`
                ).getHours() === hour
            );

            return (
              <div
                key={day.toISOString() + hour}
                className="p-1 relative border-t border-l border-gray-200 hover:bg-gray-50"
              >
                {hourAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="absolute top-1 left-1 right-1 bg-blue-400 text-white text-xs rounded p-1 shadow hover:bg-blue-500 transition-all cursor-pointer"
                    style={{
                      height: "calc(100% - 8px)",
                    }}
                  >
                    <strong className="block font-medium truncate">
                      {appointment.name} {appointment.lastName}
                    </strong>
                    <span className="text-xs truncate">{appointment.time}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WeeklyCalendar;
